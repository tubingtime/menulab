module.exports = function (req, res, next) {
  const { email, name, password } = req.body;

  // Check if a valid email has been entered by using a regex function.
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // If the path is /register, we want to make sure that there aren't any 
  // empty values AND that the email is valid.
  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }

    // If the path is /login, we want to make sure that there aren't any
    // empty values AND that the email is valid.
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  // Continue on with the route.
  next();
};
