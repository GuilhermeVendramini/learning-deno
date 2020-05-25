import { env } from "../../initial.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
const client = new MongoClient();
const db = client.database("test");

client.connectWithUri(env.MONGO_DB);

export default db;