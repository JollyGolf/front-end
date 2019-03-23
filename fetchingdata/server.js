var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 3600
});


function accept(req, res) {

  if (req.url == '/example_phones.json') {
    setTimeout(function() {
      file.serveFile('/XMLHttpRequest.html', 500, {}, req, res);
    }, 2000);
  } else {
    file.serve(req, res);
  }

}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080, () => console.log('Working!'));
} else {
  exports.accept = accept;
}