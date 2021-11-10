export default {
  path: '/authredir',
  handler(req, res) {
    // we will use this serverMiddleware-endpoint to make easy use of the env vars instead of redirecting from the client side
    const url = `https://untappd.com/oauth/authenticate/?client_id=${process.env.CLIENTID}&response_type=code&redirect_url=${process.env.REDIRECT_URL}`
    res.writeHead(307, {
      Location: url,
    })
    res.end()
  },
}
