const { check, body } = require("express-validator");

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos caracteres').bail()
        .isAlpha('es-ES', {ignore:' '}).withMessage('Sólo caracteres alfabéticos').bail(),
    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo dos caracteres').bail()
        .isAlpha('es-ES', {ignore:' '}).withMessage('Sólo caracteres alfabéticos').bail(),
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('el Email tiene un formato inválido'),
        // .custom((value, {req}) => {
        //     const users = leerJSON('users');
        //     const user = users.find(user => user.email === value.trim());
        //     const usuario = users.find(user => user.id === req.session.userLogin.id);

        //     console.log(usuario)

        //     if(user){
        //         if(usuario !== value.trim()){
                    
        //             return true
        //         }
        //     }return false
        // }).withMessage('El email ya se encutra registrado'),
    check('address')
        .isLength({
        max : 65
        }).withMessage('Máximo 65 caracteres'),
    check('city')
        .isLength({
        max : 70
        }).withMessage('Máximo 70 caracteres'),
    check('province')
        .isLength({
        max : 70
        }).withMessage('Máximo 70 caracteres'),
]