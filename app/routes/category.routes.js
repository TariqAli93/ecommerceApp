module.exports = (app) => {
   const Category = require("../controllers/category.controllers.js");

   app.post("/api/addCategory", Category.create);

   app.get("/api/categories", Category.findAll);

   app.get("/api/category/:categoryId", Category.findOne);

   app.put("/api/category/:id", Category.update);

   app.delete("/api/category/:id", Category.delete);

   app.delete("/api/categories", Category.deleteAll);
};
