export default (error, req, res, next) => {

  console.log(error.name);
  error.statusCode = 500;

  res.status(error.statusCode).json({
    errorName: error.name,
    errorMsg: error.message,
    errorCustomMsg: error.customMsg,
  });
}