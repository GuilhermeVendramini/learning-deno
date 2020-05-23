import userRouter from "./routes/users_route.ts";

import {
  Application,
} from "https://deno.land/x/oak/mod.ts";

const env = Deno.env.toObject();
const PORT: number = parseInt(env.PORT) || 8000;
const HOST: string = env.HOST || "127.0.0.1";
const app = new Application();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log(`Listening on port ${HOST}:${PORT}`);

await app.listen({ hostname: HOST, port: PORT });
