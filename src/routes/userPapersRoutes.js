const express = require("express");
const router = express.Router();
const userPapersController = require("../controllers/userPapersController");

router.get("/", userPapersController.getAllUserPapers);
router.post("/", userPapersController.addNewUserPaper);
router.put("/:id", userPapersController.updateUserPaperStatus);

module.exports = router;
