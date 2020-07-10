module.exports = (app) => {
   const User = require("../controllers/user.controllers.js");
   const authCheck = require("../middleware/checkAuth.middleware.js");

   app.post("/api/addUser", authCheck, User.create);

   app.post("/api/loginUser", User.loginUser);

   app.get("/api/users", authCheck, User.findAll);

   app.get("/api/user/:id", authCheck, User.findOne);

   app.put("/api/user/:id", authCheck, User.update);

   app.delete("/api/user/:id", authCheck, User.delete);

   app.delete("/api/users", authCheck, User.deleteAll);
};
