module.exports = (app) => {
   const ProductImage = require("../controllers/productImage.controllers.js");

   app.post("/api/addProductImage", ProductImage.create);

   app.get("/api/ProductImages", ProductImage.findAll);

   app.get("/api/productImage/:imageId", ProductImage.findOne);

   app.put("/api/productImage/:id", ProductImage.update);

   app.delete("/api/productImage/:id", ProductImage.delete);

   app.delete("/api/productImages", ProductImage.deleteAll);
};
