const {existsSync, readFileSync} = require('fs');
const db = require('../../database/models')
const path = require('path')

module.exports = (req, res) => {
        const bannerJSON = readFileSync('src/data/banner.json')
        const {file} = JSON.parse(bannerJSON)
        db.Category.findAll({
                order: ['name']
        })
        .then(categories => {
                return res.render("products/product-add",{
                bannerImage :existsSync('public/images/' + file) ? file : null,
                categories
                });
        })
        .catch(error => console.log(error))
        
}