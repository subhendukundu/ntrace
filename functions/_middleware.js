export async function onRequest(context) {
  let res;

  try {
    context.data.timestamp = Date.now();
    res = await context.next();
  } catch (err) {
    res = new Response("Oops!", { status: 500 });
  } finally {
    let delta = Date.now() - context.data.timestamp;
    res.headers.set("x-response-timing", delta);
    return res;
  }
}
