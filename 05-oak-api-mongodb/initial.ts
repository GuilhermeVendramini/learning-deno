import {
  Application,
} from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
const PORT: number = parseInt(env.PORT) || 8000;
const HOST: string = env.HOST || "127.0.0.1";
const app = new Application();

export { env, PORT, HOST, app };
