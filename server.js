const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const upload = require("express-fileupload");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/routes/admin.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/invoice.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/userInvoice.routes.js")(app);

app.get("/attachment/:file", function (request, response) {
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = `./app/attachment/${file}`;
   fs.readFile(tempFile, function (err, data) {
      console.log(extension);
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "pdf":
            contentType = "application/pdf";
            isImage = 2;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);

app.use(staticFileMiddleware);

exports.directory = __dirname;

app.listen(5000, () => {
   console.log("Server is running on port 5000.");
});
