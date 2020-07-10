module.exports = (app) => {
   const ProductStatus = require("../controllers/productStatus.controllers.js");

   app.post("/api/addProductStatus", ProductStatus.create);

   app.get("/api/allProductStatus", ProductStatus.findAll);

   app.get("/api/productStatus/:id", ProductStatus.findOne);

   app.put("/api/productStatus/:id", ProductStatus.update);

   app.delete("/api/productStatus/:id", ProductStatus.delete);

   app.delete("/api/allProductStatus", ProductStatus.deleteAll);
};
