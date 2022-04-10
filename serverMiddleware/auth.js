/* eslint-disable no-console */
import { get } from 'https'
// eslint-disable-next-line node/no-deprecated-api
import { parse } from 'url'

export default {
  path: '/auth',
  handler(req, res) {
    const query = parse(req.url, true).query

    const url =
      `https://untappd.com/oauth/authorize/` +
      `?client_id=${process.env.CLIENTID}` +
      `&client_secret=${process.env.CLIENTSECRET}` +
      `&response_type=code` +
      `&redirect_url=${process.env.REDIRECT_URL}` +
      `&code=${query.code}`

    get(url, (resp) => {
      let body = ''
      console.log(url)
      resp.on('data', (chunk) => {
        body += chunk
      })

      resp.on('end', () => {
        try {
          const json = JSON.parse(body)
          if (json.response.access_token) {
            const url = `${process.env.ACCESS_URL}?access=${json.response.access_token}`
            res.writeHead(307, {
              Location: url,
            })
            res.end()
          } else {
            // TODO: redirect to error page
            console.error(json)
          }
        } catch (error) {
          // TODO: redirect to error page
          console.error(error.message)
        }
      })
    }).on('error', (error) => {
      // TODO: redirect to error page
      console.error(error.message)
    })
  },
}
