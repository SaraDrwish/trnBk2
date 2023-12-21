// class CustomerPaper {
//   constructor(id, document, status, uploadDate, lastModifiedDate, actions) {
//     this.id = id;
//     this.document = document;
//     this.status = status;
//     this.uploadDate = uploadDate;
//     this.lastModifiedDate = lastModifiedDate;
//     this.actions = actions;
//   }
// }

// module.exports = CustomerPaper;

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    unique: true,
    required: true,
  },
  document: String,
  status: {
    type: String,
    enum: ["valid", "not valid"],
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
