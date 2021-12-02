import DeviceDetector from "device-detector-js";
export async function onRequest(context) {
  // Contents of context object
  try {
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
    } = context;

    if (request.method !== "POST") {
      return new Response("Method not supported!", { status: 500 });
    }
    const userAgent = request.headers.get("User-Agent") || "";
    if (userAgent.includes("bot")) {
      return new Response("Block User Agent containing bot!", { status: 500 });
    }
    const { projectId, pathname, referrer, sessionId } = await request.json();

    const device = deviceDetector.parse(userAgent);

    const headers = Object.fromEntries(request.headers);
    const origin = request.headers.get("Origin");
    const url = new URL(origin);
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
      session_id: sessionId,
    };

    console.log("[data]", data);

    const body = {
      query,
      variables: {
        object: data,
      },
    };

    const postCall = await fetch(GRAPHQL_API, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": WORKER_HASURA_GRAPHQL_ADMIN_SECRET,
      },
      body: JSON.stringify(body),
    });

    const returningSessionId = await postSession(postCall);

    console.log("[returningSessionId]", returningSessionId);

    return new Response(
      JSON.stringify({
        sessionId: returningSessionId,
      })
    );
  } catch (err) {
    res = new Response("Oops!", { status: 500 });
  }
}
