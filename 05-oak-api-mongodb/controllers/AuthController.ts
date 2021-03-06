import {
  Status,
} from "oak";
import hash from "../utils/hash/defaultHash.ts";
import authSchema from "../validators/schema/authSchema.ts";
import vs from "value_schema";
import authService from "../services/mongodb/users/AuthService.ts";
import Person from "../models/PersonModel.ts";
import usertoken from "../utils/token/userToken.ts";

export default {
  async login(context: Record<string, any>) {
    try {
      if (!context.request.hasBody) {
        context.throw(Status.BadRequest, "Bad Request");
      }

      let body = await context.request.body();
      let value: { login: string; password: string } | undefined;
      let logged: boolean | undefined;

      if (body.type === "json") {
        value = vs.applySchemaObject(authSchema, body.value) as {
          login: string;
          password: string;
        };
      }

      let user: Person | undefined;

      if (value?.login && value?.password) {
        user = await authService.loginUser(value.login) as Person;
        logged = await hash.verify(
          user.password,
          value.password,
        );
      }

      if (user && logged) {
        let token: string = usertoken.generate(user.id);
        context.response.body = {
          message: "User successfully logged in.",
          user: user,
          token: token,
        };
        context.response.type = "json";
        return;
      }
      context.response.status = Status.UnprocessableEntity;
      context.response.body = { error: "Wrong login or email." };
      context.response.type = "json";
      return;
    } catch (error) {
      console.log(error);
      context.response.body = { error: error.message };
      context.response.status = Status.BadRequest;
      context.response.type = "json";
      return;
    }
  },
};
