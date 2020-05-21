import { Router } from "https://deno.land/x/oak/mod.ts";
import { hash, verify } from "https://deno.land/x/argon2/lib/mod.ts";
import db from "./db.ts";

const router = new Router();

router
  .post("/login", async (context) => {
    const { value: {login, password} } = await context.request.body();
    const existAccount = db.accounts.find(async (acc) =>
      acc.login === login && await verify(acc.password, password)
    );

    if (existAccount) {
      context.response.body = JSON.stringify(
        { login: "Logged", success: true },
      );
      console.log("Logged");
    } else {
      context.response.body = JSON.stringify(
        { login: "Not logged", success: false },
      );
      console.log("Not logged");
    }
  })
  .post("/register", async (context) => {
    let t = await context.request.body();
    const { value: {login, password} } = await context.request.body();
    const hashedPassword = await hash(password);
    try {
      db.accounts.push({ login, password: hashedPassword });
      context.response.body = JSON.stringify({ login: login, success: true });
    } catch (error) {
      console.log(error);
    }
  });

export default router;
