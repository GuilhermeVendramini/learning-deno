import token from "../utils/token/userToken.ts";
import {
  Status,
} from "oak";

export default {
  async authorized(context: Record<string, any>) {
    const authorization = context.request.headers.get("authorization");
    if (!authorization) {
      context.response.status = Status.Unauthorized;
      context.response.body = { error: "Unauthorized" };
      return false;
    }
    const headerToken = authorization.replace("Bearer ", "");
    const isTokenValid = await token.validate(headerToken);
    if (!isTokenValid) {
      context.response.status = Status.Unauthorized;
      context.response.body = { error: "Unauthorized" };
      return false;
    }
    return headerToken;
  },
};
