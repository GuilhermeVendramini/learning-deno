import { PORT, HOST, app } from "./initial.ts";
import userRouter from "./routes/usersRoute.ts";
import authRouter from "./routes/authRoute.ts";
import notFoundRouter from "./routes/notFoundRoute.ts";

app.use(userRouter.routes());
app.use(authRouter.routes());
app.use(notFoundRouter);
app.use(userRouter.allowedMethods());

console.log(`Listening on port ${HOST}:${PORT}`);

await app.listen({ hostname: HOST, port: PORT });
