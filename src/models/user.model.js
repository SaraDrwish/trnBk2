// // userPaperModel.js
// class UserPaper {
//   constructor(id, document, status, uploadDate, lastModifiedDate, actions) {
//     this.id = id;
//     this.document = document;
//     this.status = status;
//     this.uploadDate = uploadDate;
//     this.lastModifiedDate = lastModifiedDate;
//     this.actions = actions;
//   }
// }

// module.exports = UserPaper;

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//   },
//   mobileNumber: {
//     type: String,
//     unique: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

// /////////////////////

// user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
  },
  // ... other fields
});

const User = mongoose.model("User", userSchema);

module.exports = User;
