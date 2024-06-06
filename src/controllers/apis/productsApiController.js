const db = require('../../database/models');



const getAllProducts = async(req,res) => {
    try {
        const { count, rows } =  await db.Product.findAndCountAll({
            include : [
                {
                    association : 'category',
                    attributes : ['name']
                }
            ],
            attributes : ['id', 'name', 'description']
        })

        const products = rows.map(product => {
            return {
                ...product.dataValues,
                detail : `${req.protocol}://${req.get('host')}/apis/products/${product.id}`
            }
        })

        return res.status(200).json({
            ok : true,
            count,
            products
        })
    } catch (error) {
        return res.status(error.status|| 500).json({
            ok: false,
            msg: error.message || 'Upss, rompiste todito, ;('
        })
    }
}

const getOneProduct = async (req,res) => {
    try {
        const product = await db.Product.findByPk(req.params.id,{
            include : [
                {
                    association : 'category',
                    attributes : ['name']
                },

                {
                    association : 'images',
                    attributes : ['name']
                }
            ],
            attributes :{
                exclude : ['categoryId', 'createdAt', 'updatedAt']
            }
        })

        const productCustom = {
            ...product.dataValues,
            image : `${req.protocol}://${req.get('host')}/images/products/${product.mainImage}`,
            category : product.category.name,
            images: product.images.map(image => ({
                name: `${req.protocol}://${req.get('host')}/images/products/${image.name}`
            }))
        }

        return res.status(200).json({
            ok : true,
            product : productCustom
        })
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            msg : error.message || 'Upss, hubo un error. Sorry!'
        })
    }
}









module.exports= {
    getAllProducts,
    getOneProduct,
    
}