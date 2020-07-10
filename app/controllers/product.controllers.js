const Product = require("../models/product.models.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const product = new Product({
      productName: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      categoryId: req.body.categoryId,
      description: req.body.description,
      downloadable: req.body.downloadable,
   });

   Product.create(product, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the Product.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Product.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Product.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Product.findById(req.params.productId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Product with id ${req.params.productId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Product with id " + req.params.productId,
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

   Product.updateById(req.params.id, new Product(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Product with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Product with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Product.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Product with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Product with id " + req.params.id,
            });
         }
      } else res.send({ message: `Product was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Product.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all Products.",
         });
      else res.send({ message: `All Products were deleted successfully!` });
   });
};
