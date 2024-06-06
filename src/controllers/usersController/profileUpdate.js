const { validationResult } = require("express-validator");
const { existsSync, unlinkSync } = require("fs");
const db = require('../../database/models');

module.exports = async (req, res) => {
    const userImage = req.files.userImage;
    const {
        name,
        surname,
        email,
        phone,
        province,
        city,
        street,
        postal_code,
    } = req.body;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const user = await db.User.findByPk(req.params.id, {
                include: ['address']
            });

            if (userImage) {

                if (user.image) {
                    existsSync("public/images/users/" + user.image) &&
                    unlinkSync("public/images/users/" + user.image);
                }

                await user.update({
                    name,
                    surname,
                    email,
                    phone,
                    image: userImage ? userImage[0].filename : null
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            );


                await user.address.update({
                    street,
                    city: city.toString(),
                    province: province.toString(),
                    postal_code,
                });

                return res.redirect('/');
            } else {

                await user.address.update({
                    street,
                    city: city.toString(),
                    province: province.toString(),
                    postal_code,
                });

                await user.update({
                    name,
                    surname,
                    email,
                    phone
                });

                return res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error del servidor");
        }
    } else {

        db.User.findByPk(req.params.id, {
            include: ['address']
        })
        .then(user => {
            return res.render('users/profile', {
                errors: errors.mapped(),
                old: req.body,
                user,
            });
        })
        .catch(error => console.log(error))
    }
}
