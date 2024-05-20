const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Please attach token!",  
      });
    }

    console.log("token-------", token)

    token = token.split(" ")[1];
    console.log("token-------", token)
    console.log(`${process.env.SECRET_KEY}`)
    let user = jwt.verify(token, process.env.SECRET_KEY);
    console.log("user-------", user)
    req.userId = user.id;
   
    next();
  } catch (err) {
    console.log(err);
  }
};


