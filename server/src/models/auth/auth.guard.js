const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../user/user.model");

async function AuthGuard(req, res, next) {
  try {
    const authorization = req?.headers?.authorization ?? undefined;
    if (!authorization) throw createHttpError(401, "login on your account");

    const [bearer, token] = authorization?.split(" ");

    if (!bearer || bearer?.toLowerCase() !== "bearer") {
      throw createHttpError(401, "login on your account");
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (verified?.user?.id) {
      const user = await User.findByPk(verified?.user?.id);
      if (!user) throw createHttpError(401, "login on your account");

      req.user = {
        id: user.id,
        mobile: user.mobile,
        fullname: user.fullname,
      };
      next();
    }

    // throw createHttpError(401, "login on your account");
  } catch (error) {
    next(error);
  }
}

module.exports = AuthGuard;
