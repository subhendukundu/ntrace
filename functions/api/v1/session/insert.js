const query = `
  query checkprojectId($projectId: uuid!) {
    project_by_pk(project_id: $projectId) {
      projectId: project_id
      domain
    }
  }
`;

const postSession = `
    mutation postSession($object: session_insert_input!) {
        session: insert_session_one(
            object: $object,
            on_conflict: {
                constraint: session_pkey
                update_columns: [updated_at]
            }) {
            sessionId: session_id
        }
    }
`;

async function postSessionCall(postCall) {
  const responseData = await postCall.json();
  console.log("[responseData]", responseData);
  const {
    data: {
      session: { sessionId },
    },
  } = responseData;
  return sessionId;
}

async function showError(error) {
    return new Response(error.message, { status: 400 });
}

export async function onRequestPost({ request }) {
    const webhookSecret = request.headers.get("webhook-secret");
    if (webhookSecret !== process.env.WORKER_HASURA_WEBHOOK_SECRET) {
      return new Response('Unauthorized!', { status: 400 });
    }

    const body = await request.json();

    const { object } = body.input;

    console.log("[object]", object);

    try {
      if (object.project_id) {
        const postCall = await fetch(process.env.NEXT_PUBLIC_NHOST_GRAPHQL_API, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              process.env.WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          body: JSON.stringify({
            query,
            variables: {
              projectId: object.project_id,
            },
          }),
        });

        const response = await postCall.json();
        console.log("[response]", response);
        if (!response.data.project_by_pk) {
          return await showError("Unrecognised request!");
        }
        const requestOrigin = object?.origin
          ?.replace(/^(?:www\.)?/i, "")
          ?.split("/")[0];
        console.log(
          "[requestOrigin]",
          requestOrigin,
          response.data.project_by_pk?.domain
        );
        if (requestOrigin !== response.data.project_by_pk?.domain) {
          return await showError("Unrecognised request!");
        }
        const { session_id: sessionId, ...rest } = object;
        const sessionData = {
          query: postSession,
          variables: {
            object: sessionId ? object : { ...rest },
          },
        };
        const sessionSubmitRes = await fetch(process.env.NEXT_PUBLIC_NHOST_GRAPHQL_API, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              process.env.WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          body: JSON.stringify(sessionData),
        });
        const returningSessionId = await postSessionCall(sessionSubmitRes);
        console.log("[sessionId]", returningSessionId);
        return {
          data: {
            session_id: returningSessionId,
          },
        };
      } else {
        return await showError("Unrecognised request!");
      }
    } catch (e) {
      console.log("[error]", e.message, e.toString());
      return await showError("Something went wrong!");
    }
};
