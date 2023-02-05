var nomnoml = require('nomnoml')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/nn.svg', (req, res) => {
  const src = req.query.src
  console.log(src)

  const svg = nomnoml.renderSvg(src)

  res.status(200)
    .header('Content-Type', 'image/svg+xml')
    .send(svg)
})

module.exports = router;
