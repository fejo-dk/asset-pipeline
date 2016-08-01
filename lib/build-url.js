const url = require('url')

const buildUrl = (baseUrl, asset) => {
  return url.format({
    protocol: baseUrl.protocol,
    auth: baseUrl.auth,
    host: baseUrl.host,
    pathname: `${baseUrl.pathname}/${asset}`,
    search: baseUrl.search,
    hash: baseUrl.hash
  })
}

module.exports = buildUrl
