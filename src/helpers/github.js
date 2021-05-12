// TODO: use GITHUB_OAUTH_TOKEN for authenticate app and get more api quota
// authenticated quota is 5.000 request per hour
const headers = {
  Authorization: `token ${process.env.GITHUB_OAUTH_TOKEN}`,
}

const config = { headers }

export const getPathContent = async (path) => {
  return await fetch(`${process.env.REPO_URL}${path}`, config).then((r) =>
    r.json()
  )
}

export const getUrlContent = async (url) => {
  return await fetch(url, config).then((r) => r.json())
}
