// const fs = require("fs");
// const CustomerPaper = require("../models/customerPaperModel");

// const customerPapersPath = "customerPapers.json";

// const readData = () => JSON.parse(fs.readFileSync(customerPapersPath, "utf-8"));
// const writeData = (data) =>
//   fs.writeFileSync(customerPapersPath, JSON.stringify(data, null, 2), "utf-8");

// class CustomerPapersService {
//   getAll() {
//     return readData();
//   }

//   addNew(id, document, uploadDate, lastModifiedDate) {
//     const status = "not valid";
//     const actions = ["upload"];

//     const newCustomerPaper = new CustomerPaper(
//       id,
//       document,
//       status,
//       uploadDate,
//       lastModifiedDate,
//       actions
//     );

//     const customerPapers = readData();
//     customerPapers.push(newCustomerPaper);
//     writeData(customerPapers);

//     return newCustomerPaper;
//   }

//   updateStatus(id, status) {
//     const customerPapers = readData();
//     const paperIndex = customerPapers.findIndex((paper) => paper.id === id);

//     if (paperIndex !== -1) {
//       customerPapers[paperIndex].status = status;

//       if (status === "valid") {
//         customerPapers[paperIndex].actions = ["view", "edit"];
//       } else {
//         customerPapers[paperIndex].actions = ["upload"];
//       }

//       writeData(customerPapers);
//       return customerPapers[paperIndex];
//     } else {
//       throw new Error("Paper not found");
//     }
//   }
// }

// module.exports = new CustomerPapersService();

/////////////////////////////////////

const Customer = require("../models/customer.model");

class CustomerService {
  async getAllCustomers() {
    try {
      const customers = await Customer.find();
      return { success: true, data: customers };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getOneCustomerById(customerId) {
    try {
      const customer = await Customer.findById(customerId);
      return { success: true, data: customer };
    } catch (error) {
      return { success: false, error };
    }
  }

  async createCustomer(customerData) {
    try {
      const newCustomer = new Customer(customerData);
      await newCustomer.save();
      return { success: true, data: newCustomer };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateCustomerById(customerId, updatedData) {
    try {
      const customer = await Customer.findByIdAndUpdate(
        customerId,
        updatedData,
        { new: true }
      );
      return { success: true, data: customer };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteCustomerById(customerId) {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
      return { success: true, data: deletedCustomer._id };
    } catch (error) {
      return { success: false, error };
    }
  }
}

module.exports = new CustomerService();
