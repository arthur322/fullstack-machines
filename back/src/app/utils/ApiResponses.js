const generateResponse = (res, status, data) => {
  return res.status(status).json({
    code: status,
    data
  });
};

const errorResponse = (res, data) => {
  return generateResponse(res, 500, data);
};

const successResponse = (res, data) => {
  return generateResponse(res, 200, data);
};

const createdResponse = (res, data) => {
  return generateResponse(res, 201, data);
};

const notFoundResponse = (res, data) => {
  return generateResponse(res, 404, data);
};

module.exports = {
  errorResponse,
  successResponse,
  createdResponse,
  notFoundResponse
};
