const {existsSync, unlinkSync} = require('fs');
const { leerJSON, escribirJSON } = require("../../data");


const changeBanner = async(req,res) => {
    try {
       
        if(!req.files.length){
            throw new Error('No hay imagen')
        }
        const lastBanner = leerJSON("banner") 
        const objetBanner = {
            file : req.files[0].filename
        }
        
        //(req.files && existsSync('public/images/banners/' + lastBanner.file)) && unlinkSync('public/images/banners/' + lastBanner.file)
        if(req.files){
            existsSync('public/images/banners/' + lastBanner.file) && unlinkSync('public/images/banners/' + lastBanner.file)
        } 
        
        
        

        escribirJSON(objetBanner,"banner")
        

        return res.status(200).json({
            ok : true,
            msg : 'imagen modificada con éxito',
            file : req.files[0].filename
        })
    } catch (error) {
        return res.status(error.status|| 500).json({
            ok: false,
            msg: error.message || 'Upss, rompiste todito, ;('
        })
    }
}

module.exports = {
    changeBanner
}