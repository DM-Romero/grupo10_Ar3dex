const {check, body} = require('express-validator');

module.exports= [ 
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail(),
    body('price')
        .notEmpty().withMessage('El precio es obligatorio').bail()
        .custom((value, {req}) => {
            if(value < 1){
                return false
            }
            return true
        }).withMessage('Aquí no regalamos nada').bail()
        .isNumeric().withMessage('Debes poner un número').bail(),
    body('discount')
        .isNumeric().withMessage('Debes poner un número').bail(),
    check('description')
            .notEmpty().withMessage('Se requiere una descripción del producto').bail()
            .isLength({
                min : 10,
                max : 1000
            }).withMessage('La descripción debe tener entre 10 y 1000 caracteres')
]