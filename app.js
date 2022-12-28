const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const path = require('path')
const ejs = require('ejs')

const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')
const Photo = require('./models/Photo')

const app = express();

//connect db
// mongoose.connect('mongodb://localhost:27017/pcat-test-db')
mongoose.connect('mongodb+srv://merve1:hDZHHElNY1ETzcZz@cluster0.gtwk1dr.mongodb.net/pcat-db?retryWrites=true&w=majority').then(() => {
  console.log('DB Connected')
}).catch((err) => {
  console.log(err)
})

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
//statik dosyalar(css, html gibi) public klasörüne taşındı
app.use(express.static('public'))

// app.use(myLogger)

//request body'sini(req.body) görebilmek, okuyabilip kaydetmek için express modülüne ait urlencoded ve json fonksiyonları kullanıldı
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))

//routes and CRUDs
app.get('/', photoController.getAllPhotos) //index
app.get('/photos/:id', photoController.getPhoto) //photo's single page
app.post('/photos', photoController.createPhoto) //add photo - post operation
app.put('/photos/:id', photoController.updatePhoto) //edit photo
app.delete('/photos/:id', photoController.deletePhoto) //delete photo

app.get('/add', pageController.getAboutPage)
app.get('/about', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)


// const port = 3000;
// app.listen(port, () => {
//   console.log(`Sunucu ${port} portunda başlatıldı`)
// })
