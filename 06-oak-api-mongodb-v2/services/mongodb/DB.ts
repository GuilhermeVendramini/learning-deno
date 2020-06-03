import { env } from "../../initial.ts";
import { MongoClient } from "mongo";
const client = new MongoClient();
const DB = client.database("test");

client.connectWithUri(env.MONGO_DB);

export default DB;
