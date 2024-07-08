import jwt from "jsonwebtoken";

const { JWT_PUBLIC_KEY } = process.env;

const BEARER_REGEX = /Bearer\s(.+)/;

export function apiAuthentication(request, response, next) {
  const { authorization } = request.headers;
  try {
    if (authorization == null) {
      throw new Error("No 'Authorization' header");
    }
    const match = BEARER_REGEX.exec(authorization);
    if (match == null) {
      throw new Error("Invalid authorization method");
    }
    jwt.verify(match[1], JWT_PUBLIC_KEY);
    return next();
  } catch (error) {
    error.status = 401;
    return next(error);
  }
}
