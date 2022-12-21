//mongoose kullanmak için oluşturulan test dosyası

const mongoose = require('mongoose')
const Schema = mongoose.Schema //Schema yapısı sayesinde türetilen nesneleri mongoDB içerisindeki dokümanlara dönüştürür.


//connect db
mongoose.connect('mongodb://localhost:27017/pcat-test-db')

process.on('warning', (warning) => {
    console.log(warning.stack);
})

//create schema
const PhotoSchema = new Schema({
    title: String,
    description: String
})

const Photo = mongoose.model('Photo',PhotoSchema)

//create photo
// Photo.create({
//     title: "Photo Test 2",
//     description: "Photo description test 2"
// })


//read photo
// Photo.find({}, (err, data) => {
//     console.log(data);
//   })

//update photo
// const id = '63a2b7b9aecc9004da6b58e9';
// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo Test 1 updated',
//     description: 'Photo description test 1 updated',
//   },
//   {
//       new: true //console'da verinin güncellenmiş halini gösterir.
//   },
//   (err, data) => {
//     console.log(data);
//   }
// )

//delete a photo
const id = '63a2e50a022142fa3aedf2f4'

Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo removed');
})
