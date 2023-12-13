const userPapersService = require("../services/userPapersService");

class UserPapersController {
  getAllUserPapers(req, res) {
    const userPapers = userPapersService.getAll();
    res.json(userPapers);
  }

  addNewUserPaper(req, res) {
    const { id, document, uploadDate, lastModifiedDate } = req.body;
    const newPaper = userPapersService.addNew(
      id,
      document,
      uploadDate,
      lastModifiedDate
    );
    res.json(newPaper);
  }

  updateUserPaperStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updatedPaper = userPapersService.updateStatus(id, status);
      res.json(updatedPaper);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserPapersController();
