const sql = require("./db.js");

const Invoice = function (invoice) {
   this.userId = invoice.userId;
   this.note = invoice.note;
};

Invoice.create = (newInvoice, result) => {
   sql.query("INSERT INTO invoice SET ?", newInvoice, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created invoice: ", { id: res.insertId, ...newInvoice });
      result(null, { id: res.insertId, ...newInvoice });
   });
};

Invoice.findById = (invoiceId, result) => {
   sql.query(
      `SELECT * FROM invoice WHERE idInvoice = ${invoiceId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found invoice: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Invoice.getAll = (result) => {
   sql.query("SELECT * FROM invoice", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("invoiceId: ", res);
      result(null, res);
   });
};

Invoice.updateById = (id, invoice, result) => {
   sql.query(
      "UPDATE invoice SET ? WHERE idInvoice = ?",
      [invoice, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated invoice: ", { id: id, ...invoice });
         result(null, { id: id, ...invoice });
      }
   );
};

Invoice.remove = (id, result) => {
   sql.query("DELETE FROM invoice WHERE idInvoice = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted invoice with id: ", id);
      result(null, res);
   });
};

Invoice.removeAll = (result) => {
   sql.query("DELETE FROM invoice", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} invoice`);
      result(null, res);
   });
};

module.exports = Invoice;
