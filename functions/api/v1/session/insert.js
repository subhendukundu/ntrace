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
            sessionId: id
        }
    }
`;

const checkTrack = `
    query check_track($id: uuid!) {
        track_analytics(id: $id) {
            output {
                session_id
            }
            errors
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
  const { WORKER_HASURA_WEBHOOK_SECRET, NEXT_PUBLIC_NHOST_GRAPHQL_API, WORKER_HASURA_GRAPHQL_ADMIN_SECRET } = env;
  if (webhookSecret !== WORKER_HASURA_WEBHOOK_SECRET) {
    return new Response("Unauthorized!", { status: 400 });
  }

  const body = await request.json();

  const { object } = body.input;

  console.log("[object]", object);

  try {
    if (object.project_id) {
      const postCall = await fetch(
        `${NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
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
        session_id: analyticSessionId,
        pathname,
        protocol,
        referrer,
        ...rest
      } = object;
      let sessionId = null;
      if (analyticSessionId) {
        const postSessionData = await fetch(
          `${NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "x-hasura-admin-secret": WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
            },
            body: JSON.stringify({
              query: checkTrack,
              variables: {
                id: analyticSessionId,
              },
            }),
          }
        );
        const postSessionDataResponse = await postSessionData.json();
        sessionId = postSessionDataResponse.data?.track_analytics?.output?.session_id
      }

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
        `${NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          body: JSON.stringify(sessionData),
        }
      );
      const returningSessionId = await postSessionCall(sessionSubmitRes);
      console.log("[sessionId]", returningSessionId);
      return new Response(
        JSON.stringify({
          session_id: returningSessionId,
        })
      );
    } else {
      return await showError("Unrecognised request!");
    }
  } catch (e) {
    console.log("[error]", e.message);
    return await showError(e.message);
  }
}
