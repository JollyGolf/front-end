const http = require('http');
const html = `
<!doctype>
    <html>
      <head>
        <meta charset="utf-8">
        <title>http request</title>
        <link rel="stylesheet" href="app.css"
      <head> 
      <body>
        <h1>http request, start server on nodejs</h1>
        <button>button</button>
        <script src="app.js"></script>
      </body>
    </html>`;
const css = ` 
          body {
          	margin: 0;
          	padding: 0;
          	text-align: center;
          }
          h1 {
          	background-color: #353535;
          	color: white;
          	padding: .5em;         	
          	font-family: 'Consolas';
          }`;
const js = `
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/example_phones.json', true);
  xhr.send();

  document.querySelector('button').addEventListener('click', event => {
  	console.log('gg wp');
  });
`;

http.createServer((req, res) => {
	switch(req.url) {
	  case '/': 
	    res.writeHead(200, { 'Content-Type':'text/html' });
  		res.end(html);
  	  case '/app.css': 
  	    res.writeHead(200, { 'Content-Type':'text/css' });
  		res.end(css);
  	  case '/app.js':
  	    res.writeHead(200, { 'Content-Type':'text/javascript' });
  		res.end(js);
  	  default:
  	    res.writeHead(404, { 'Content-Type':'text/plain' });
  		res.end('404 not found');
	}
  
}).listen(1337, () => console.log('Server was running'));