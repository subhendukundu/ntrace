export async function onRequestPost(request) {
  return new Response(JSON.stringify(request));
}
