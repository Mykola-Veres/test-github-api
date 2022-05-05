import { Octokit } from "@octokit/rest";

// const octokit = new Octokit()

const octokit = new Octokit({
  auth: "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",
});

export async function fetchUserData(userName) {
  const { data } = await octokit.request(`GET /users/${userName}`, {
  username: `${userName}`
})
  return data
}

export async function fetchUserRepos(userName) {
  const {data} = await octokit.request(`GET /users/${userName}/repos`, {
    username: `${userName}`,
  })
  return data
}

export async function fetchRepoLanguages(userName, repo) {
  const {data} = await octokit.request(`GET /repos/${userName}/${repo}/languages`, {
  owner: `${userName}`,
  repo: `${repo}`,
})
  return data
}

