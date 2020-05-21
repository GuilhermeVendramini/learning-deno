import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import authRouter from "./src/auth.ts";

const router = new Router();
const app = new Application();

router
  .get("/", (context) => {
    context.response.body = "Home";
  });

app.use(router.routes());
app.use(router.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

await app.listen({ port: 8000 });
