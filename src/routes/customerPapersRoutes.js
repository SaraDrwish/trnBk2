// const express = require("express");
// const router = express.Router();
// const customerPapersController = require("../controllers/customerPapersController");

// router.get("/", customerPapersController.getAllCustomerPapers);
// router.post("/", customerPapersController.addNewCustomerPaper);
// router.put("/:id", customerPapersController.updateCustomerPaperStatus);

// module.exports = router;

//////////////////////////////////////

// const express = require("express");
// const router = express.Router();
// const customerPapersController = require("../controllers/customerPapersController");

// router.get("/", customerPapersController.getAllCustomerPapers);
// router.post("/", customerPapersController.addNewCustomerPaper);
// router.put("/:id", customerPapersController.updateCustomerPaperStatus);

// module.exports = router;

// /////////////////////////////////////////////////

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.get("/", customerController.getAllCustomersCtrl);
router.get("/:id", customerController.getOneCustomerCtrl);
router.post("/", customerController.createCustomerCtrl);
router.put("/:id", customerController.updateCustomerCtrl);
router.delete("/:id", customerController.deleteCustomerCtrl);

module.exports = router;
