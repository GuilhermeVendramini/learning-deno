import {
  findAllUsers,
  insertUser,
  findUser,
  updateUser,
  deleteUser,
} from "../services/mongodb/users/users_service.ts";
import person from "../models/person_model.ts";
import {
  Status,
} from "https://deno.land/x/oak/mod.ts";

async function getUsers(context: Record<string, any>) {
  context.response.body = JSON.stringify(
    await findAllUsers(),
  );
  return;
}

async function getUser(context: Record<string, any>) {
  context.response.body = JSON.stringify(
    await findUser(parseInt(context.params.id)),
  );
  return;
}

async function addUser(context: Record<string, any>) {
  try {
    if (!context.request.hasBody) {
      context.throw(Status.BadRequest, "Bad Request");
    }

    let method = context.request.method;
    let body = await context.request.body();
    let user: Partial<person> | undefined;

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
        await insertUser(user as person);
      }

      if (method == "PUT") {
        context.assert(
          user?.id != null && typeof user.id === "number",
          Status.BadRequest,
        );
        await updateUser(user as person);
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
}

function removeUser(context: Record<string, any>) {
  try {
    deleteUser(parseInt(context.params.id));
    context.response.status = Status.NoContent;
    return;
  } catch (error) {
    console.log(error);
    context.throw(Status.BadRequest, "Bad Request");
  }
}

export { getUsers, getUser, addUser, removeUser };
