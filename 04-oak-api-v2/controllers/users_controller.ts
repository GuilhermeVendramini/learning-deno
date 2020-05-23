import users from "../datas/user_data.ts";
import person from "../models/person_model.ts";
import {
  Status,
} from "https://deno.land/x/oak/mod.ts";

function getUsers(context: Record<string, any>) {
  context.response.body = JSON.stringify(
    users,
  );
}

function getUser(context: Record<string, any>) {
  context.response.body = JSON.stringify(
    users.filter((user) => user.id === parseInt(context.params.id)),
  );
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
        users.push(user as person);
      }

      if (method == "PUT") {
        context.assert(
          user?.id != null && typeof user.id === "number",
          Status.BadRequest,
        );

        let userIndex = users.findIndex((u) => u.id == user?.id);
        if (userIndex > -1) {
          users[userIndex] = user as person;
        }
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

function deleteUser(context: Record<string, any>) {
  try {
    let userIndex = users.findIndex((u) => u.id == parseInt(context.params.id));

    if (userIndex > -1) {
      users.splice(userIndex, 1);
    }

    context.response.status = Status.OK;
    context.response.body = users;
    context.response.type = "json";
    return;
  } catch (error) {
    console.log(error);
    context.throw(Status.BadRequest, "Bad Request");
  }
}

export { getUsers, getUser, addUser, deleteUser };
