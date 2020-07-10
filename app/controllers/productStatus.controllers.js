const ProductStatus = require("../models/productStatus.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const productStatus = new ProductStatus({
      statusName: req.body.statusName,
   });

   ProductStatus.create(productStatus, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the ProductStatus.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   ProductStatus.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving ProductStatus.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProductStatus.findById(req.params.statusId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found ProductStatus with id ${req.params.statusId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving ProductStatus with id " +
                  req.params.statusId,
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

   ProductStatus.updateById(
      req.params.id,
      new ProductStatus(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found ProductStatus with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating ProductStatus with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProductStatus.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found ProductStatus with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete ProductStatus with id " + req.params.id,
            });
         }
      } else res.send({ message: `ProductStatus was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProductStatus.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all ProductStatus.",
         });
      else
         res.send({ message: `All ProductStatus were deleted successfully!` });
   });
};
