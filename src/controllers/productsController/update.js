const { validationResult } = require("express-validator");
const { existsSync, unlinkSync } = require("fs");
const db = require("../../database/models");

module.exports = async (req, res) => {
  const mainImage = req.files.mainImage;
  const images = req.files.images;

  const { name, price, description, offer, discount, categoryId } = req.body;

  const { id } = req.params;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    try {
      const product = await db.Product.findByPk(id, {
        include: ["images"],
      });

      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }

      if (images && images.length > 0) {
        for (const image of product.images) {
          existsSync("public/images/products/" + image.name) &&
            unlinkSync("public/images/products/" + image.name);
        }
        mainImage &&
          existsSync("public/images/products/" + product.mainImage) &&
          unlinkSync("public/images/products/" + product.mainImage);

        await db.Image.destroy({
          where: {
            id_product: id,
          },
        });

        const imagesDB = images.map((image) => {
          return {
            name: image.filename,
            id_product: product.id,
          };
        });

        await db.Image.bulkCreate(imagesDB, {
          validate: true,
        });
      }

      await db.Product.update(
        {
          name: name.trim(),
          price,
          description: description.trim(),
          offer: +offer,
          discount,
          mainImage: mainImage ? mainImage[0].filename : product.mainImage,
          categoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error del servidor");
    }
  } else {
    if (mainImage) {
      existsSync(`public/images/products/${mainImage[0].filename}`) &&
        unlinkSync(`public/images/products/${mainImage[0].filename}`);
    }
    if (images) {
      images.forEach((image) => {
        existsSync("public/images/products/" + image) &&
          unlinkSync("public/images/products/" + image);
      });
    }
    const product = db.Product.findByPk(id, {
      include : ['category']
  })
    const categories = db.Category.findAll({
      order: [["name"]],
    });
    Promise.all([product, categories])
      .then(([product, categories]) => {
        return res.render("products/product-edit", {
          ...product.dataValues,
          categories,
          errors: errors.mapped(),
        });
      })
      .catch((error) => console.log(error));
  }
};
