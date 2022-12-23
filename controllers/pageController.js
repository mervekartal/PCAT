const Photo = require('../models/Photo')

//routing operations
exports.getAboutPage =  (req, res) => {
    res.render('add')
}

exports.getAddPage = (req, res) => {
    res.render('about')
}

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    res.render('edit', {photo})
}