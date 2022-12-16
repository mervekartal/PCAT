const express = require('express');
const path = require('path')
const ejs = require('ejs')

const app = express();

//Template Engine
app.set("view engine", "ejs")

// const myLogger = (req, res, next) => {
//   console.log("middleware log")
//   next()
// }

//middlewares
//statik dosyaları(css html gibi) public klasörüne taşındı
app.use(express.static('public'))
// app.use(myLogger)

//route
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'))
  res.render('index')
})
app.get('/add', (req, res) => {
  res.render('add')
})
app.get('/about', (req, res) => {
  res.render('about')
})


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
