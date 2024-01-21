import jwtActions from "jsonwebtoken";

export const createToken = async (id, username, status) => {
  try {
    const accessToken = jwtActions.sign(
      { id: id, username: username, role: status },
      "JWT_SECRET",
      { expiresIn: "1h" }
    );
    return accessToken;
  } catch (error) {
    throw error;
  }
};
export const validateSuperAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({
      response_code: 401,
      status: false,
      message: "Super admin access required!",
    });
    return;
  }
//   get actual token
  const accessToken = authToken.replace("Bearer ", "");
  jwtActions.verify(accessToken, "JWT_SECRET", (error, decode) => {
    if (error) {
      res.status(401).json({
        response_code: 401,
        status: false,
        message: error.message,
      });
    }
    if (decode.role !== "super admin") {
      res.status(403).json({
        response_code: 403,
        status: false,
        message: "Access denied!",
      });
    }
    next(); // middleware function
  });
};
export const validateAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({
      response_code: 401,
      status: false,
      message: "Super admin or admin access required!",
    });
    return;
  }
  const accessToken = authToken.replace("Bearer ", "");
  jwtActions.verify(accessToken, "JWT_SECRET", (error, decode) => {
    if (error) {
      res.status(401).json({
        response_code: 401,
        status: false,
        message: error.message,
      });
    }
    if (decode.role !== "admin" && decode.role !== "super admin") {
      res.status(403).json({
        response_code: 403,
        status: false,
        message: "Access denied!",
      });
    }
    next();
  });
};
export const decodeJwt = async (req, res, next) => {
  const authToken = req.headers.authorization;
  const token = authToken?.replace("Bearer ", "") || req.cookies.token;
  if (!token) {
    return res.status(401).json({
      response_code: 401,
      message: " Missing token!",
    });
  }
  const verifyPromise = () => {
    return new Promise((resolve, reject) => {
      jwtActions.verify(token, "JWT_SECRET", (error, decode) => {
        if (error) {
          reject(error);
        } else {
          resolve(decode);
        }
      });
    });
  };
  try {
    const decoded = await verifyPromise();
    return {
      status: true,
      decoded: decoded,
    };
  } catch (error) {
    return {
      status: false,
      message: "Invalid token",
    };
  }
};
export const validateRequest = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({
      status: false,
      message: "Token not valid",
    });
    return;
  }
  const accessToken = authToken.replace("Bearer ", "");
  jwtActions.verify(accessToken, "JWT_SECRET", (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }
    next();
  });
};
