const db = require('../../database/models');

module.exports = (req, res) => {
    const { id } = req.session.userLogin;

    db.User.findByPk(id,{ 
        include : ["address"],
    }).then(user => {
        // return res.send(user)
        const image = user.image ? `/images/users/${user.image}` : `/images/users/default-user-image.jpg`;
        return res.render('users/profile', { user, image });
    })
    .catch(error => console.log(error));
};