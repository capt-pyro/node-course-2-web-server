const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log(`Unable to make log entry!`);
    }
  })
  //req()
  next();
});

//triggers the maintainence webpage preventing anything else from showing up.
// app.use((req,res,next) =>{
//   res.render('maintainence.hbs')
// });
//add it after maintainence so all pages are blocked by maintainence.hbs
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) =>{
  //res.send('<h1>The person looking at this message is dumb and should learn some programming</h1>');
  // res.send({
  //   name: 'Joe',
  //   likes: ['Biking', 'Cities']
  // })
  res.render('main.hbs', {
    pageTitle: 'Home',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my first Express Powered WebPage'
  })
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About',
    pageMessage: 'This site was created 2/April/17 - Site Owner "JOE SIMON"'
    //currentYear: new Date().getFullYear()
  });
  //res.send('Made using express');
})

app.get('/bad', (req,res) =>{
  res.send({
    Error: 'Unable to fetch data'
  })
})
app.listen(3000);
