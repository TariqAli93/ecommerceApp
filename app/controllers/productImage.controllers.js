const ProductImage = require("../models/productImages.models.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const directory = require("./../../server");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   if (req.files) {
      var file = req.files.attachment;
      var filename = file.name;

      file.mv(directory.directory + "/app/attachment/" + filename, function (
         err
      ) {
         if (err) {
            console.log(err);
            res.status(401).send("unable to upload file");
         } else {
            const productImage = new ProductImage({
               imageUrl: "http://localhost/attachment/" + filename,
               productId: req.body.productId,
            });
            ProductImage.create(productImage, (err, data) => {
               if (err)
                  res.status(500).send({
                     message:
                        err.message ||
                        "Some error occurred while creating the homework.",
                  });
               else res.send(data);
            });
         }
      });
   }
};

exports.findAll = (req, res) => {
   ProductImage.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving ProductImage.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductImage.findById(req.params.imageId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(200).send([]);
         } else {
            res.status(500).send({
               message:
                  "Error retrieving ProductImage with id " + req.params.imageId,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   ProductImage.updateById(
      req.params.id,
      new ProductImage(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found ProductImage with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating ProductImage with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductImage.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found ProductImage with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete ProductImage with id " + req.params.id,
            });
         }
      } else res.send({ message: `ProductImage was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductImage.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all ProductImage.",
         });
      else res.send({ message: `All ProductImage were deleted successfully!` });
   });
};
