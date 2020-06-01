import UsersService from "../services/mongodb/users/UsersService.ts";
import Person from "../models/PersonModel.ts";
import {
  Status,
} from "oak";
import personSchema from "../validators/schema/personSchema.ts";
import vs from "value_schema";
import hash from "../utils/hash/default_hash.ts";

export default {
  async getUsers(context: Record<string, any>) {
    context.response.body = await UsersService.findAllUsers();
    context.response.type = "json";
    return;
  },

  async getUser(context: Record<string, any>) {
    context.response.body = await UsersService.findUser(
      parseInt(context.params.id),
    );
    context.response.type = "json";
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
        user = vs.applySchemaObject(personSchema, body.value);
      }

      if (user) {
        user.password = await hash.bcrypt(user?.password as string);
        if (method == "POST") {
          await UsersService.insertUser(user as Person);
        }

        if (method == "PUT") {
          await UsersService.updateUser(user as Person);
        }
        context.response.body = user;
        context.response.type = "json";
        return;
      }
      context.throw(Status.BadRequest, "Bad Request");
    } catch (error) {
      console.log(error);
      context.response.body = { error: error.message };
      context.response.status = Status.BadRequest;
      context.response.type = "json";
      return;
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
