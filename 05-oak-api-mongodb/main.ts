import { PORT, HOST, app } from "./initial.ts";
import userRouter from "./routes/users_route.ts";

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

console.log(`Listening on port ${HOST}:${PORT}`);

await app.listen({ hostname: HOST, port: PORT });
