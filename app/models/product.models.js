const sql = require("./db.js");

const Product = function (product) {
   this.productName = product.productName;
   this.price = product.price;
   this.quantity = product.quantity;
   this.image = product.image;
   this.categoryId = product.categoryId;
   this.description = product.description;
   this.downloadable = product.downloadable;
};

Product.create = (newProduct, result) => {
   sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created product: ", { id: res.insertId, ...newProduct });
      result(null, { id: res.insertId, ...newProduct });
   });
};

Product.findById = (productId, result) => {
   sql.query(
      `SELECT * FROM products WHERE idProduct = ${productId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Product.getAll = (result) => {
   sql.query("SELECT * FROM products", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("productId: ", res);
      result(null, res);
   });
};

Product.updateById = (id, product, result) => {
   sql.query(
      "UPDATE products SET ? WHERE idProduct = ?",
      [product, id],
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

         console.log("updated product: ", { id: id, ...product });
         result(null, { id: id, ...product });
      }
   );
};

Product.remove = (id, result) => {
   sql.query("DELETE FROM products WHERE idProduct = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted product with id: ", id);
      result(null, res);
   });
};

Product.removeAll = (result) => {
   sql.query("DELETE FROM products", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} product`);
      result(null, res);
   });
};

module.exports = Product;
