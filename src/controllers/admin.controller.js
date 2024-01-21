import adminService from "../services/admin.service.js";


const adminController = {
  changeSuperAdminPassword: async (req, res) => {
    const superAdminId = req.params.id;
    console.log(superAdminId);
    const { oldPassword, newPassword } = req.body;
    try {
      const result = await adminService.changeSuperAdminPassword(
        superAdminId,
        oldPassword,
        newPassword
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error occurred!" });
    }
  },
  adminLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await adminService.adminLogin(username, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error occurred!" });
    }
  },
};

export default adminController;
