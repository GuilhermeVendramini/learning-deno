import token from "../utils/token/userToken.ts";
import {
  Status,
} from "oak";
import UsersService from "../services/mongodb/users/UsersService.ts";

export default {
  async authorized(context: Record<string, any>, next: Function) {
    const authorization = context.request.headers.get("authorization");
    if (!authorization) {
      context.response.status = Status.Unauthorized;
      context.response.body = { error: "Unauthorized" };
      return;
    }
    const headerToken = authorization.replace("Bearer ", "");
    const isTokenValid = await token.validate(headerToken);
    if (!isTokenValid) {
      context.response.status = Status.Unauthorized;
      context.response.body = { error: "Unauthorized" };
      return;
    }

    const data: any = token.fetchUserId(headerToken);
    if (data) {
      let user = await UsersService.findUser(
        parseInt(data.uid),
      );
      context.state.currentUser = user;
    }

    await next();
  },
  async authorizedToken(context: Record<string, any>, next: Function) {
    const jwt = context.cookies.get("jwt");
    if (jwt) {
      const data: any = token.fetchUserId(jwt);
      if (data) {
        let user = await UsersService.findUser(
          parseInt(data.uid),
        );
        context.state.currentUser = user;
      } else {
        context.cookies.delete("jwt");
      }
    } else {
      context.state.currentUser = null;
    }
    await next();
  },
};
