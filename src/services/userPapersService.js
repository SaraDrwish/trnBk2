// const fs = require("fs");
// const UserPaper = require("../models/userPaperModel");

// const userPapersPath = "userPapers.json";

// const readData = () => JSON.parse(fs.readFileSync(userPapersPath, "utf-8"));
// const writeData = (data) =>
//   fs.writeFileSync(userPapersPath, JSON.stringify(data, null, 2), "utf-8");

// class UserPapersService {
//   getAll() {
//     return readData();
//   }

//   addNew(id, document, uploadDate, lastModifiedDate) {
//     const status = "not valid";
//     const actions = ["upload"];

//     const newUserPaper = new UserPaper(
//       id,
//       document,
//       status,
//       uploadDate,
//       lastModifiedDate,
//       actions
//     );

//     const userPapers = readData();
//     userPapers.push(newUserPaper);
//     writeData(userPapers);

//     return newUserPaper;
//   }

//   updateStatus(id, status) {
//     const userPapers = readData();
//     const paperIndex = userPapers.findIndex((paper) => paper.id === id);

//     if (paperIndex !== -1) {
//       userPapers[paperIndex].status = status;

//       if (status === "valid") {
//         userPapers[paperIndex].actions = ["view", "edit"];
//       } else {
//         userPapers[paperIndex].actions = ["upload"];
//       }

//       writeData(userPapers);
//       return userPapers[paperIndex];
//     } else {
//       throw new Error("Paper not found");
//     }
//   }
// }

// module.exports = new UserPapersService();

// user.service.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
  async getAllUsers() {
    try {
      const users = await User.find();
      return { success: true, data: users };
    } catch (error) {
      return { success: false, error };
    }
  }

  async getOneUserById(userId) {
    try {
      const user = await User.findById(userId);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  }

  async createUser(userData) {
    try {
      const { userId, mobileNumber, document } = userData;
      const existingUser = await User.findOne({
        $or: [{ userId }, { mobileNumber }],
      });
      if (existingUser) {
        return {
          success: false,
          error: `This ${
            existingUser.userId === userId ? "userId" : "MobileNumber"
          } already in use.`,
        };
      }

      let generatedUserId = userId || (await genUserId());
      const newUser = new User({ ...userData, userId: generatedUserId });
      await newUser.save();

      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateUserById(userId, updatedData) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      const { password, mobileNumber, document } = updatedData;
      let existingUser = await User.findOne({
        _id: { $ne: userId },
        $or: [{ userId }, { mobileNumber }],
      });
      if (existingUser) {
        return {
          success: false,
          error: `This ${
            existingUser.userId === userId ? "User ID" : "MobileNumber"
          } already in use.`,
        };
      }

      if (password) {
        const genSalt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, genSalt);
        updatedData.password = hash;
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...updatedData, document },
        { new: true }
      );
      return { success: true, data: updatedUser };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateUserProfile(userId, updatedProfile) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, error: "User not found" };
      }

      if (updatedProfile.mobileNumber) {
        const existingUser = await User.findOne({
          _id: { $ne: userId },
          mobileNumber: updatedProfile.mobileNumber,
        });
        if (existingUser) {
          return { success: false, error: `This MobileNumber already in use.` };
        }
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updatedProfile, {
        new: true,
      });
      return { success: true, data: updatedUser };
    } catch (error) {
      return { success: false, error };
    }
  }

  async deleteUserById(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return { success: false, error: "User not found." };
      }
      return { success: true, data: deletedUser._id };
    } catch (error) {
      return { success: false, error };
    }
  }
}

module.exports = new UserService();
