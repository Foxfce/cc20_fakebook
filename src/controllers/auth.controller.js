export const register = async (req, res, next) => {
  res.json({
    msg: "register",
    body: req.body,
  })
}

export const login = async (req, res, next) => {
  res.json({
    msg: "login",
    body: req.body,
  });
}

export const getMe = async (req, res) => {
  res.json({
    msg: "Get me",
    value: x
  });
}