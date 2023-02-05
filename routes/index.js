const express = require('express');
const router = express.Router();

const nomnoml = require('nomnoml')
const { Octokit, App } = require('octokit')

async function fetchGist(gist) {
  try {
    const octokit = new Octokit({
      auth: null
    })

    const gist_api_response = await octokit.request('GET /gists/{gist_id}', {
      gist_id: gist
    })

    console.dir(gist_api_response.data.files)
    const keys = Object.keys(gist_api_response.data.files)
    return gist_api_response.data.files[keys[0]].content
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

  const gist = req.query.gist
  let src = req.query.src

  if (gist) {
    src = await fetchGist(gist)
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
