module.exports = (app) => {
   const Admin = require("../controllers/admin.controllers.js");

   app.post("/api/addAdmin", Admin.create);

   app.post("/api/loginAdmin", Admin.loginAdmin);

   app.get("/api/admins", Admin.findAll);

   app.get("/api/admin/:id", Admin.findOne);

   app.put("/api/admin/:id", Admin.update);

   app.delete("/api/admin/:id", Admin.delete);

   app.delete("/api/admins", Admin.deleteAll);
};
