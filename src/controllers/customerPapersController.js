const customerPapersService = require("../services/customerPapersService");

class CustomerPapersController {
  getAllCustomerPapers(req, res) {
    const customerPapers = customerPapersService.getAll();
    res.json(customerPapers);
  }

  addNewCustomerPaper(req, res) {
    const { id, document, uploadDate, lastModifiedDate } = req.body;
    const newPaper = customerPapersService.addNew(
      id,
      document,
      uploadDate,
      lastModifiedDate
    );
    res.json(newPaper);
  }

  updateCustomerPaperStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedPaper = customerPapersService.updateStatus(id, status);
      res.json(updatedPaper);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CustomerPapersController();
