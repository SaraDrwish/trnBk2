// const express = require("express");
// const router = express.Router();
// const customerPapersController = require("../controllers/customerPapersController");

// router.get("/", customerPapersController.getAllCustomerPapers);
// router.post("/", customerPapersController.addNewCustomerPaper);
// router.put("/:id", customerPapersController.updateCustomerPaperStatus);

// module.exports = router;

//////////////////////////////////////

const express = require("express");
const router = express.Router();
const customerPapersController = require("../controllers/customerPapersController");

router.get("/", customerPapersController.getAllCustomerPapers);
router.post("/", customerPapersController.addNewCustomerPaper);
router.put("/:id", customerPapersController.updateCustomerPaperStatus);

module.exports = router;
