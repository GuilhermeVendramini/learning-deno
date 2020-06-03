import {
  Status,
} from "oak";
import hash from "../utils/hash/defaultHash.ts";
import authSchema from "../validators/schema/authSchema.ts";
import vs from "value_schema";
import authService from "../services/mongodb/users/AuthService.ts";
import Person from "../models/PersonModel.ts";
import usertoken from "../utils/token/userToken.ts";
import { renderFileToString } from "dejs";

export default {
  async login(context: Record<string, any>) {
    try {
      if (!context.request.hasBody) {
        context.throw(Status.BadRequest, "Bad Request");
      }

      let body = await context.request.body();
      let value: { username: string; password: string } | undefined;
      let logged: boolean | undefined;

      if (body.type === "json") {
        value = vs.applySchemaObject(authSchema, body.value) as {
          username: string;
          password: string;
        };
      }

      if (body.type === "form") {
        let username = body.value.get("username");
        let password = body.value.get("password");
        value = vs.applySchemaObject(authSchema, { username, password }) as {
          username: string;
          password: string;
        };
      }

      let user: Person | undefined;

      if (value?.username && value?.password) {
        user = await authService.loginUser(value.username) as Person;
        logged = await hash.verify(
          user.password,
          value.password,
        );
      }

      if (user && logged) {
        let token: string = usertoken.generate(user.id);

        if (body.type == "form") {
          context.cookies.set("jwt", token);
          context.response.redirect("/");
          return;
        }

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

  async loginView(context: Record<string, any>) {
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/login.ejs`,
      {
        error: false,
      },
    );
  },

  logout(context: Record<string, any>){
    context.cookies.delete('jwt');
    context.response.redirect('/');
  }
};
