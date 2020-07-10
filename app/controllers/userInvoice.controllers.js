const UserInvoice = require("../models/userInvoice.models.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const userInvoice = new UserInvoice({
      productId: req.body.productId,
      invoiceId: req.body.invoiceId,
      quantity: req.body.quantity,
      discount: req.body.discount,
      totalPrice: req.body.totalPrice,
   });

   UserInvoice.create(userInvoice, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the userInvoice.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   UserInvoice.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving userInvoice.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   UserInvoice.findById(req.params.userInvoiceId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found userInvoice with id ${req.params.userInvoiceId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving userInvoice with id " +
                  req.params.userInvoiceId,
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

   UserInvoice.updateById(
      req.params.id,
      new UserInvoice(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found userInvoice with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating userInvoice with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   UserInvoice.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found userInvoice with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete userInvoice with id " + req.params.id,
            });
         }
      } else res.send({ message: `userInvoice was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   UserInvoice.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all userInvoices.",
         });
      else res.send({ message: `All userInvoices were deleted successfully!` });
   });
};
