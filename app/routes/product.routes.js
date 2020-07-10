module.exports = (app) => {
   const Product = require("../controllers/product.controllers.js");

   app.post("/api/addProduct", Product.create);

   app.get("/api/products", Product.findAll);

   app.get("/api/product/:productId", Product.findOne);

   app.put("/api/product/:id", Product.update);

   app.delete("/api/product/:id", Product.delete);

   app.delete("/api/products", Product.deleteAll);
};
