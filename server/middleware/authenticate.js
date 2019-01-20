const { User } = require("../models/user");

const authenticate = (req, res, next) => {
  // Store "x-auth" header key:value
  const token = req.header("x-auth");

  // Call model method()findByToken
  // @params - token
  User.findByToken(token)
    .then(user => {
      // if no user
      if (!user) {
        // reject
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).send();
    });
};

module.exports = { authenticate };
