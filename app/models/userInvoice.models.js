const sql = require("./db.js");

const UserInvoice = function (userInvoice) {
   this.productId = userInvoice.productId;
   this.invoiceId = userInvoice.invoiceId;
   this.quantity = userInvoice.quantity;
   this.discount = userInvoice.discount;
   this.totalPrice = userInvoice.totalPrice;
};

UserInvoice.create = (newUserInvoice, result) => {
   sql.query("INSERT INTO userInvoice SET ?", newUserInvoice, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created UserInvoice: ", {
         id: res.insertId,
         ...newUserInvoice,
      });
      result(null, { id: res.insertId, ...newUserInvoice });
   });
};

UserInvoice.findById = (userInvoiceId, result) => {
   sql.query(
      `SELECT * FROM userInvoice WHERE idUserInvoice = ${userInvoiceId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found UserInvoice: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

UserInvoice.getAll = (result) => {
   sql.query("SELECT * FROM userInvoice", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("UserInvoice: ", res);
      result(null, res);
   });
};

UserInvoice.updateById = (id, userInvoice, result) => {
   sql.query(
      "UPDATE userInvoice SET ? WHERE idInvoice = ?",
      [userInvoice, id],
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

         console.log("updated UserInvoice: ", { id: id, ...userInvoice });
         result(null, { id: id, ...userInvoice });
      }
   );
};

UserInvoice.remove = (id, result) => {
   sql.query(
      "DELETE FROM userInvoice WHERE idUserInvoice = ?",
      id,
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

         console.log("deleted userInvoice with id: ", id);
         result(null, res);
      }
   );
};

UserInvoice.removeAll = (result) => {
   sql.query("DELETE FROM userInvoice", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} userInvoice`);
      result(null, res);
   });
};

module.exports = UserInvoice;
