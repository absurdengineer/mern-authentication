const AuthController = {
  register: async (req, res) => {
    return res.status(200).json({ message: "Registration Successful" });
  },
  login: async (req, res) => {
    return res.status(200).json({ message: "Login Successful" });
  },
  refresh: async (req, res) => {
    return res.status(200).json({ message: "Refresh Successful" });
  },
  logout: async (req, res) => {
    return res.status(200).json({ message: "Logout Successful" });
  },
};

module.exports = AuthController;
