const sql = require("./db.js");

const ProductStatus = function (productStatus) {
   this.statusName = productStatus.statusName;
};

ProductStatus.create = (newProductStatus, result) => {
   sql.query(
      "INSERT INTO productStatus SET ?",
      newProductStatus,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created productStatus: ", {
            id: res.insertId,
            ...newProductStatus,
         });
         result(null, { id: res.insertId, ...newProductStatus });
      }
   );
};

ProductStatus.findById = (productStatusId, result) => {
   sql.query(
      `SELECT * FROM productStatus WHERE idStatus = ${productStatusId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found productStatus: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductStatus.getAll = (result) => {
   sql.query("SELECT * FROM productStatus", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productStatusId: ", res);
      result(null, res);
   });
};

ProductStatus.updateById = (id, productStatus, result) => {
   sql.query(
      "UPDATE productStatus SET ? WHERE idStatus = ?",
      [productStatus, id],
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

         console.log("updated productStatus: ", { id: id, ...productStatus });
         result(null, { id: id, ...productStatus });
      }
   );
};

ProductStatus.remove = (id, result) => {
   sql.query("DELETE FROM productStatus WHERE idStatus = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted productStatus with id: ", id);
      result(null, res);
   });
};

ProductStatus.removeAll = (result) => {
   sql.query("DELETE FROM productStatus", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} productStatus`);
      result(null, res);
   });
};

module.exports = ProductStatus;
