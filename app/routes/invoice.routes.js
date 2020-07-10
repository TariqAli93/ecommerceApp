module.exports = (app) => {
   const Invoice = require("../controllers/invoice.controllers.js");

   app.post("/api/addInvoice", Invoice.create);

   app.get("/api/invoice", Invoice.findAll);

   app.get("/api/invoice/:id", Invoice.findOne);

   app.put("/api/invoice/:id", Invoice.update);

   app.delete("/api/invoice/:id", Invoice.delete);

   app.delete("/api/invoices", Invoice.deleteAll);
};
