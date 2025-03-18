const fetch: ExportedHandlerFetchHandler = async (req) => {
  return Response.json({
    "X-Forwarded-For": req.headers.get("X-Forwarded-For"),
    "CF-Connecting-IP": req.headers.get("CF-Connecting-IP")
  })
}

export default {
  fetch,
};
