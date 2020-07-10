const sql = require("./db.js");

const User = function (user) {
   this.name = user.name;
   this.phone = user.phone;
   this.password = user.password;
   this.email = user.email;
   this.address = user.address;
};

User.create = (newUser, result) => {
   sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
   });
};

User.findById = (userId, result) => {
   sql.query(`SELECT * FROM users WHERE idUser = ${userId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found user: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

User.login = (userName, password, result) => {
   sql.query(
      `SELECT * FROM users WHERE name = "${userName}" AND password = "${password}"`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

User.getAll = (result) => {
   sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("user: ", res);
      result(null, res);
   });
};

User.updateById = (id, user, result) => {
   sql.query("UPDATE users SET ? WHERE idUser = ?", [user, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
   });
};

User.remove = (id, result) => {
   sql.query("DELETE FROM users WHERE idUser = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
   });
};

User.removeAll = (result) => {
   sql.query("DELETE FROM users", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log(`deleted ${res.affectedRows} user`);
      result(null, res);
   });
};

module.exports = User;
