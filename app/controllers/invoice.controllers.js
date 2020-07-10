const Invoice = require("../models/invoice.models.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const invoice = new Invoice({
      userId: req.body.userId,
      note: req.body.note,
   });

   Invoice.create(invoice, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the invoice.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Invoice.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving invoice.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Invoice.findById(req.params.invoiceId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Invoice with id ${req.params.invoiceId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving Invoice with id " + req.params.invoiceId,
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

   Invoice.updateById(req.params.id, new Invoice(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found invoice with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating invoice with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Invoice.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found invoice with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete invoice with id " + req.params.id,
            });
         }
      } else res.send({ message: `invoice was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Invoice.removeAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while removing all invoices.",
         });
      else res.send({ message: `All invoices were deleted successfully!` });
   });
};
