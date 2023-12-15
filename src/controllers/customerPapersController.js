// customerPapersController.js
const express = require("express");
const CustomerPaperModel = require("../models/customerPaperModel");

class CustomerPapersController {
  getAllCustomerPapers(req, res) {
    const customerPapers = [
      new CustomerPaperModel(
        1,
        "Document 1",
        "valid",
        "2023-01-01",
        "2023-01-02",
        ["view", "edit"]
      ),
      new CustomerPaperModel(
        2,
        "Document 2",
        "not valid",
        "2023-02-01",
        "2023-02-02",
        ["upload"]
      ),
    ];

    res.json(customerPapers);
  }

  addNewCustomerPaper(req, res) {
    const { id, document, uploadDate, lastModifiedDate } = req.body;
    const newCustomerPaper = new CustomerPaperModel(
      id,
      document,
      "not valid",
      uploadDate,
      lastModifiedDate,
      ["upload"]
    );

    console.log("New Customer Paper:", newCustomerPaper);

    res.json(newCustomerPaper);
  }

  updateCustomerPaperStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    console.log(`Updating Customer Paper ${id} Status to ${status}`);

    res.json({ message: `Customer Paper ${id} status updated to ${status}` });
  }
}

module.exports = new CustomerPapersController();
