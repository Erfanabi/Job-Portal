const AllExceptionHandler = (err, req, res, next) => {
  let status = err?.statusCode ?? err?.status ?? err?.code;

  if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;

  res.send({
    statusCode: status,
    message: err?.message ?? err?.stack ?? "internalServerError",
  });
};

export default AllExceptionHandler;

// const AllExceptionHandler = (err, req, res, next) => {
//   let status = err.statusCode || err.status || 500;

//   if (isNaN(status) || status < 100 || status > 599) {
//     status = 500;
//   }

//   const responseBody = {
//     statusCode: status,
//     message: err.message || "خطایی در سرور رخ داده است.",
//   };

//   res.status(status).json(responseBody);
// };

// export default AllExceptionHandler;
