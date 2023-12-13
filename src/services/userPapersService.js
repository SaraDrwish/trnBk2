const fs = require("fs");
const UserPaper = require("../models/userPaperModel");

const userPapersPath = "userPapers.json";

const readData = () => JSON.parse(fs.readFileSync(userPapersPath, "utf-8"));
const writeData = (data) =>
  fs.writeFileSync(userPapersPath, JSON.stringify(data, null, 2), "utf-8");

class UserPapersService {
  getAll() {
    return readData();
  }

  addNew(id, document, uploadDate, lastModifiedDate) {
    const status = "not valid";
    const actions = ["upload"];

    const newUserPaper = new UserPaper(
      id,
      document,
      status,
      uploadDate,
      lastModifiedDate,
      actions
    );

    const userPapers = readData();
    userPapers.push(newUserPaper);
    writeData(userPapers);

    return newUserPaper;
  }

  updateStatus(id, status) {
    const userPapers = readData();
    const paperIndex = userPapers.findIndex((paper) => paper.id === id);

    if (paperIndex !== -1) {
      userPapers[paperIndex].status = status;

      if (status === "valid") {
        userPapers[paperIndex].actions = ["view", "edit"];
      } else {
        userPapers[paperIndex].actions = ["upload"];
      }

      writeData(userPapers);
      return userPapers[paperIndex];
    } else {
      throw new Error("Paper not found");
    }
  }
}

module.exports = new UserPapersService();
