import DeviceDetector from "device-detector-js";
const deviceDetector = new DeviceDetector();

const query = `
    mutation set_track($object: TrackInput!) {
        sessionId: track_analytics(object: $object)
    }
`;

export async function onRequestPost({ request, env }) {
  // Contents of context object
  try {
    const userAgent = request.headers.get("User-Agent") || "";
    if (userAgent.includes("bot")) {
      return new Response("Block User Agent containing bot!", { status: 500 });
    }
    const { projectId, pathname, referrer, sessionId } = await request.json();

    const device = deviceDetector.parse(userAgent);

    const headers = Object.fromEntries(request.headers);
    const origin = request.headers.get("Origin");
    const url = origin ? new URL(origin) : {};
    const {
      latitude,
      longitude,
      timezone,
      region,
      country,
      continent,
      city,
      regionCode,
      postalCode,
    } = request.cf;

    const data = {
      ip: headers["x-real-ip"] || headers["cf-connecting-ip"],
      project_id: projectId,
      session_id: sessionId,
      client_name: device?.client?.name,
      client_type: device?.client?.type,
      client_version: device?.client?.version,
      client_engine: device?.client?.engine,
      os_name: device?.os?.name,
      os_version: device?.os?.version,
      device_type: device?.device?.type,
      device_brand: device?.device?.brand,
      device_model: device?.device?.model,
      language: headers["accept-language"],
      origin: url.hostname,
      protocol: url.protocol,
      latitude,
      longitude,
      timezone,
      region,
      country,
      continent,
      city,
      region_code: regionCode,
      postal_code: postalCode,
      referrer,
      pathname,
    };

    console.log("[data]", data);

    const body = {
      query,
      variables: {
        object: data,
      },
    };

    const postCall = await fetch(
      `${env.NEXT_PUBLIC_NHOST_GRAPHQL_API}/v1/graphql`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": env.WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
        },
        body: JSON.stringify(body),
      }
    );

    const responseData = await postCall.json();
    console.log("[responseData]", responseData);

    return new Response(
      JSON.stringify({
        sessionId: responseData?.data?.sessionId,
      })
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}
