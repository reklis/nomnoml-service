const express = require('express');
const router = express.Router();

const nomnoml = require('nomnoml')
const { Octokit, App } = require('octokit')

async function fetchGist(gist_id) {
  try {
    const octokit = new Octokit({
      auth: null
    })

    const gist_api_response = await octokit.request('GET /gists/{gist_id}', {
      gist_id
    })

    console.dir(gist_api_response.data.files)
    const keys = Object.keys(gist_api_response.data.files)
    return gist_api_response.data.files[keys[0]].content
  } catch (ex) {
    console.error(ex)
    return null
  }
}

async function fetchSnippet(snippet) {
  try {
    const api_root = process.env.GITHUB_API_ROOT || 'https://gitlab.com'
    const api_response = await fetch(`${api_root}/api/v4/snippets/${snippet}`)
    const api_data = await api_response.json()
    console.dir(api_data)
    const src_url = api_data.files[0].raw_url
    const src_response = await fetch(src_url)
    return await src_response.text()
  } catch (ex) {
    console.error(ex)
    return null
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/nn.svg', async (req, res) => {
  let svg = ''

  const { gist, snippet } = req.query
  let src = req.query.src

  if (gist) {
    src = await fetchGist(gist)
  }

  if (snippet) {
    src = await fetchSnippet(snippet)
  }

  if (src) {
    console.log(src)
    svg = nomnoml.renderSvg(src)
  }

  res.status(200)
    .header('Content-Type', 'image/svg+xml')
    .send(svg)
})

module.exports = router;
