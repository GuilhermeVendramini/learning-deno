import {
  Application,
  Router,
  Status,
} from "https://deno.land/x/oak/mod.ts";

const env = Deno.env.toObject();
const PORT: number = parseInt(env.PORT) || 8000;
const HOST: string = env.HOST || "127.0.0.1";

const router = new Router();
const app = new Application();

type person = {
  id: number;
  name: string;
  age: number;
};

let users: Array<person> = [
  {
    id: 0,
    name: "Carol",
    age: 25,
  },
  {
    id: 1,
    name: "Guilherme",
    age: 32,
  },
  {
    id: 2,
    name: "Maike",
    age: 20,
  },
  {
    id: 3,
    name: "Sophia",
    age: 12,
  },
];

router
  .get("/", (context) => {
    context.response.body = "Home";
  })
  .get("/users", getUsers)
  .get<{ id: string }>("/users/:id", getUser)
  .post("/users", addUser)
  .put("/users", addUser)
  .delete<{ id: string }>("/users/:id", deleteUser);

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

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${HOST}:${PORT}`);

await app.listen({ hostname: HOST, port: PORT });
