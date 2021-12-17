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
        session: insert_session_one(object: $object) {
            sessionId: session_id
        }
    }
`;

const postPageview = `
    mutation postSession($object: pageview_insert_input!) {
        session: insert_pageview_one(object: $object) {
            id
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
  return new Response(error, { status: 400 });
}

export async function onRequestPost({ request, env }) {
  const webhookSecret = request.headers.get("webhook-secret");
  if (webhookSecret !== env.WORKER_HASURA_WEBHOOK_SECRET) {
    return new Response("Unauthorized!", { status: 400 });
  }

  const body = await request.json();

  const { object } = body.input;

  console.log("[object]", object);

  try {
    if (object.project_id) {
      const postCall = await fetch(
        `${env.NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": env.WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          body: JSON.stringify({
            query,
            variables: {
              projectId: object.project_id,
            },
          }),
        }
      );

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
      const {
        session_id: sessionId,
        pathname,
        protocol,
        referrer,
        ...rest
      } = object;
      const sessionData = {
        query: sessionId ? postPageview : postSession,
        variables: {
          object: sessionId
            ? { session_id: sessionId, referrer: referrer, url: pathname }
            : { ...rest },
        },
      };
      console.log("[sessionData]", sessionData);
      const sessionSubmitRes = await fetch(
        `${env.NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": env.WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          body: JSON.stringify(sessionData),
        }
      );
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
    console.log("[error]", e.message);
    return await showError(e.message);
  }
}
