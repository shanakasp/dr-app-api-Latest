import adminRepo from "./src/repository/admin.repo.js";

// Super admin generating function
const generateSuperAdmin = async () => {
  try {
    const superAdmin = await adminRepo.getSuperAdmin();
    // check availability of super admin
    // can only have one super admin
    if (superAdmin.length > 0) {
      console.log("Super admin already exist!");
    } else {
      const result = await adminRepo.registerSuperAdmin();
      if (result) {
        console.log("Super admin created successfully!");
      } else {
        console.error("Failed to create super admin!");
      }
    }
  } catch (error) {
    console.error("Error generating super admin:", error);
  }
};

// call the function
generateSuperAdmin();
