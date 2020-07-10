module.exports = (app) => {
   const UserInvoice = require("../controllers/userInvoice.controllers.js");
   const authCheck = require("../middleware/checkAuth.middleware.js");

   app.post("/api/addUserInvoice", authCheck, UserInvoice.create);

   app.get("/api/userInvoice", UserInvoice.findAll);

   app.get("/api/userInvoice/:userInvoiceId", authCheck, UserInvoice.findOne);

   app.put("/api/userInvoice/:id", authCheck, UserInvoice.update);

   app.delete("/api/userInvoice/:id", authCheck, UserInvoice.delete);

   app.delete("/api/userInvoices", authCheck, UserInvoice.deleteAll);
};
