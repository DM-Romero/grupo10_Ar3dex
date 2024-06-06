const db = require('../../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = (req, res) => {
    db.Product.findByPk(req.params.id, { include: [{ model: db.Image, as: 'images' }] })
        .then(product => {
            return res.render('products/product-detail', {
                ...product.dataValues,
                toThousand,
            });
        })
        .catch(error => console.log(error));
};
