import bcrypt from "bcrypt";
import sequelize from "../../config/db.connection.js";
import { Admin } from "./../models/model.js";

const adminRepo = {
  registerSuperAdmin: async () => {
    try {
      // Check if the super admin username is defined
      if (!process.env.SUPER_ADMIN_USERNAME) {
        throw new Error(
          "Super admin username is missing. Please set SUPER_ADMIN_USERNAME in your environment variables."
        );
      }

      // Check if the super admin already exists
      const existingSuperAdmin = await Admin.findOne({
        where: {
          username: process.env.SUPER_ADMIN_USERNAME,
        },
      });

      // If the super admin doesn't exist, create it
      if (!existingSuperAdmin) {
        // Hash the default password "admin"
        const encrypted_pw = await bcrypt.hash("admin", 10);

        await sequelize.sync();
        const result = await Admin.create({
          username: process.env.SUPER_ADMIN_USERNAME,
          password: encrypted_pw,
        });

        return !!result; // Assuming `result` is truthy if successful
      } else {
        console.log("Super admin already exists.");
        return false; // Super admin already exists
      }
    } catch (error) {
      throw error;
    }
  },
  
  getSuperAdmin: async () => {
    try {
      const result = await Admin.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSuperAdminById: async (superAdminId) => {
    try {
      const result = await Admin.findAll({
        where: {
          id: superAdminId,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAdminByUsername: async (username) => {
    try {
      const result = await Admin.findAll({
        where: {
          username: username,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  changeSuperAdminPassword: async (superAdminId, newPasswordHash) => {
    try {
      await sequelize.sync();
      const result = await Admin.update(
        {
          password: newPasswordHash,
        },
        {
          where: {
            id: superAdminId,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default adminRepo;
