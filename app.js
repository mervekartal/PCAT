const express = require('express');
const app = express();

// const myLogger = (req, res, next) => {
//   console.log("middleware log")
//   next()
// }

//middlewares
//statik dosyaları(css html gibi) public klasörüne taşındı
app.use(express.static('public'))
// app.use(myLogger)

app.get('/', (req, res) => {
  const photo = {
    id: 1,
    name: 'photo name',
    description: 'description',
  }
  res.send(photo)
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
