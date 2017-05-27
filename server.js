const express = require('express');
const app = express();
//const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const jsonfile = require('jsonfile');
const request = require('request');
const cheerio = require('cheerio');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const DOM = React.DOM;
  const head = DOM.head;
  const body = DOM.body;
  const main = DOM.main;
  const section = DOM.section;
  const div = DOM.div;
  const script = DOM.script;
  const meta = DOM.meta;
  const link = DOM.link;
  const style = DOM.style;
  const title = DOM.title

/*
const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'qwer',
  database:'wallscape'
//  connectionLimit:
});*/

//Important!! babel-polyfill is here for the whole code after it!
require('babel-polyfill');
const browserify = require('browserify');
const babelify = require("babelify");
/*
const reducer = require('./reducer.js');
const Routes = require('./Routes.jsx');
var database_forServer = path.join(__dirname+'/data/database_forServer.json');
*/
app.set('view engine', 'jsx');
app.set('views', __dirname + 'public/app/views');
app.engine('jsx', require('express-react-views').createEngine({transformViews: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/req/:purpose', function(req, res){
  let requestingPage = req.query.url;
  console.log("requesting: "+requestingPage);
  request(requestingPage, function(error, response, html){
  	if(error){
  		console.log("Error: "+ error);
  	}
  	if(response.statusCode===200){
  		let cheer$ = cheerio.load(html);
      let title = cheer$('head>meta[property="og:title"]').attr('content') || cheer$('head>meta[name="title"]').attr('content') || cheer$('head>title').html();
      let siteName = cheer$('head>meta[property="og:site_name"]').attr('content') || cheer$('head>meta[name="application-name"]').attr('content');
  		let description = cheer$('head>meta[property="og:description"]').attr('content') || cheer$('head>meta[name="description"]').attr('content');
      let img = cheer$('head>meta[property="og:image"]').attr('content');
      let url = cheer$('head>meta[property="og:url"]').attr('content');

      res.setHeader('Content-Type', 'text/plain')
      res.json({title: title, siteName: siteName, description: description, img: img, url: url})
  	}else{
      console.log("Status Code: "+ response.statusCode);
      res.end();
    }
  })
})

app.use('/resources/:type/:file', function(req, res){
  let filetype = req.params.type;
  let filename = req.params.file;
  let options = {
      root: __dirname + '/public/resources/'+filetype
  };
  let mimetype = {
    'html' : 'text/html',
    'ico' : 'image/x-icon',
    'jpg' : 'image/jpeg',
    'png' : 'image/png',
    'gif' : 'image/gif',
    'css' : 'text/css',
    'js' : 'application/javascript'
  }[filetype];
  console.log(mimetype)
  res.setHeader('Content-Type', mimetype)
  res.sendFile(filename, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }else {
      console.log('Sent:', filename);
    }
  });
})

app.use('/bundle',function(req, res){
  res.setHeader('Content-Type', 'application/javascript');
  console.log('requesting for bundle.js');
  browserify({debug: true})
    .transform(babelify.configure({
      presets: [
        "react",
        "env"
      ],
      compact: false
    }))
    .require("./public/app/app.js", {entry: true})
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(res);
})

app.use('/', function(req, res){
  console.log("requesting for index");
  let htmlHead = ReactDOMServer.renderToStaticMarkup(
    head(
     null,
     title({dangerouslySetInnerHTML:{__html: "Pileup"}}),
     meta({charSet: "utf-8"}),
     meta({name: "description", content: ""}),
     meta({property: "og:url", content: ""}),
     meta({property: "og:image", content: ""}),
     script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", type: "text/javascript"}),
     script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
     link({rel: "stylesheet", type: "text/css", href: "/resources/css/draft.css"}),
     link({rel: "stylesheet", href: "https://fonts.googleapis.com/earlyaccess/notosanstc.css"}),
     style({fontFamily: "'Noto Sans TC', '微軟正黑體', 'Helvetica Neue', Helvetica, Futura, sans-serif, Arial", })
   )
  );
  let htmlBody = ReactDOMServer.renderToStaticMarkup(
    body(
     null,
     main({id: 'app'}),
     script({src: '/bundle'})
   )
  );

  res.setHeader('Content-Type', 'text/html');
  res.end(htmlHead + htmlBody);
})

app.listen(process.env.port || 3080);
console.log("Running at Port 3080");
