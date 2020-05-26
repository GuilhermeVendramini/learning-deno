import UsersService from "../services/mongodb/users/UsersService.ts";
import Person from "../models/PersonModel.ts";
import {
  Status,
} from "https://deno.land/x/oak/mod.ts";

export default {
  async getUsers(context: Record<string, any>) {
    context.response.body = JSON.stringify(
      await UsersService.findAllUsers(),
    );
    return;
  },

  async getUser(context: Record<string, any>) {
    context.response.body = JSON.stringify(
      await UsersService.findUser(parseInt(context.params.id)),
    );
    return;
  },

  async addUser(context: Record<string, any>) {
    try {
      if (!context.request.hasBody) {
        context.throw(Status.BadRequest, "Bad Request");
      }

      let method = context.request.method;
      let body = await context.request.body();
      let user: Partial<Person> | undefined;

      if (body.type === "json") {
        user = body.value;
        context.assert(
          user?.age && typeof user.age === "number",
          Status.BadRequest,
        );
        context.assert(
          user?.name && typeof user.name === "string",
          Status.BadRequest,
        );
      }

      if (user) {
        if (method == "POST") {
          user.id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
          await UsersService.insertUser(user as Person);
        }

        if (method == "PUT") {
          context.assert(
            user?.id != null && typeof user.id === "number",
            Status.BadRequest,
          );
          await UsersService.updateUser(user as Person);
        }

        context.response.status = Status.OK;
        context.response.body = user;
        context.response.type = "json";
        return;
      }
      context.throw(Status.BadRequest, "Bad Request");
    } catch (error) {
      console.log(error);
      context.throw(Status.BadRequest, "Bad Request");
    }
  },

  removeUser(context: Record<string, any>) {
    try {
      UsersService.deleteUser(parseInt(context.params.id));
      context.response.status = Status.NoContent;
      return;
    } catch (error) {
      console.log(error);
      context.throw(Status.BadRequest, "Bad Request");
    }
  },
};
