const User = require("../model/userScema");

async function getProfile(req, res) {
  try {
    const user_id = req.userId;

    const user = await User.findById(user_id);

    if (!user) {
      res.json({ success: false, message: "User is not found" });
    }

    res.json({
      success: true,
      userInfo: {
        userName: user.name,
        AccountVarification: user.isAccountVerified,
      },
    });
  } catch (err) {
    res.json({ success: false, message: "Error : " + err });
  }
}

module.exports = getProfile;
