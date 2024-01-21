import adminRepo from "../repository/admin.repo.js";
import bcrypt from "bcrypt";

const adminService = {
  changeSuperAdminPassword: async (superAdminId, oldPassword, newPassword) => {
    try {
      // get super admin
      const superAdmin = await adminRepo.getSuperAdminById(superAdminId);
      if (!superAdmin[0]) {
        return {
          status: false,
          message: "Super admin not found!",
        };
      }
      // checking current password
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        superAdmin[0].password
      );
      if (!passwordMatch) {
        return {
          status: false,
          message: "Incorrect old password!",
        };
      }
      // hash new password using bcrypt algorithm
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      const result = await adminRepo.changeSuperAdminPassword(
        superAdminId,
        newPasswordHash
      );
      if (!result) {
        return {
          status: false,
          message: "Password update failed!",
        };
      } else {
        return {
          status: true,
          message: "Password updated successfully!",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  // admin login logic
  adminLogin: async (username, password) => {
    try {
      const superAdmin = await adminRepo.getAdminByUsername(username);
      if (!superAdmin[0]) {
        return {
          status: false,
          message: "Super admin not found!",
        };
      }
      // checking password
      const passwordMatch = await bcrypt.compare(
        password,
        superAdmin[0].password
      );
      if (!passwordMatch) {
        return {
          status: false,
          message: "Incorrect password!",
        };
      } else {
        return {
          status: true,
          message: "Login Successfully!",
        };
      }
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
