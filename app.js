const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const fs = require('fs')
const methodOverride = require('method-override')

const path = require('path')
const ejs = require('ejs')

const Photo = require('./models/Photo')

const app = express();

//connect db
mongoose.connect('mongodb://localhost:27017/pcat-test-db')

process.on('warning', (warning) => {
    console.log(warning.stack);
})


//Template Engine
app.set("view engine", "ejs")

// const myLogger = (req, res, next) => {
//   console.log("middleware log")
//   next()
// }

//middlewares
//statik dosyaları(css, html gibi) public klasörüne taşındı
app.use(express.static('public'))
// app.use(myLogger)

//request body'sini(req.body) görebilmek, okuyabilip kaydetmek için express modülüne ait urlencoded ve json fonksiyonları kullanıldı
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method'))

//routes
app.get('/', async (req, res) => {
  //oluşturulan photo modeli yönlendirme alanına gönderilerek dinamik modelin html'e gömülebilmesi sağlanır.
  const photos = await Photo.find({}).sort('-dateCreated')
  res.render('index', {
    photos: photos
  })
})
app.get('/add', (req, res) => {
  res.render('add')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id)
  //res.render('about')
  const photo = await Photo.findById(req.params.id)
  res.render('photo',{
    photo
  })
})

//add photo - post operation
app.post('/photos', async (req, res) => {
  // console.log(req.body)
  // console.log(req.files.image)
  // await Photo.create(req.body)
  // res.redirect('/')

  const uploadDir = 'public/uploads'
  
  //upload directory kontrolü
  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  let uploadedImage = req.files.image
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name 
  
  //görseli yüklenmesini istediğimiz klasöre move ediyoruz.
  uploadedImage.mv(uploadPath,     async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name
    })
    res.redirect('/')
  })
})

app.get('/photos/edit/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  res.render('edit', {photo})
})

app.put('/photos/:id', async (req, res) => {
  const photo = await Photo.findOne({_id: req.params.id})
  photo.title = req.body.title
  photo.description = req.body.description
  photo.save()

  res.redirect(`/photos/${req.params.id}`)
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
