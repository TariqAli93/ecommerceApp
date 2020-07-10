const sql = require("./db.js");

const ProductImage = function (productImage) {
   this.imageUrl = productImage.imageUrl;
   this.productId = productImage.productId;
};

ProductImage.create = (newProductImage, result) => {
   sql.query("INSERT INTO productImage SET ?", newProductImage, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created ProductImage: ", {
         id: res.insertId,
         ...newProductImage,
      });
      result(null, { id: res.insertId, ...newProductImage });
   });
};

ProductImage.findById = (imageId, result) => {
   sql.query(
      `SELECT * FROM productImage WHERE idImage = ${imageId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found ProductImage: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProductImage.getAll = (result) => {
   sql.query(`SELECT * FROM productImage`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("ProductImage: ", res);
      result(null, res);
   });
};

ProductImage.updateById = (id, productImage, result) => {
   sql.query(
      "UPDATE productImage SET ? WHERE id = ?",
      [productImage, id],
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

         console.log("updated ProductImage: ", { id: id, ...productImage });
         result(null, { id: id, ...productImage });
      }
   );
};

ProductImage.remove = (id, result) => {
   sql.query("DELETE FROM productImage WHERE idImage = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted ProductImage with id: ", id);
      result(null, res);
   });
};

ProductImage.removeAll = (result) => {
   sql.query("DELETE FROM productImage", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} ProductImage`);
      result(null, res);
   });
};

module.exports = ProductImage;
