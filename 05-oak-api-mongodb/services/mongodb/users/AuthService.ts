import DB from "../DB.ts";

const data = DB.collection("users");

export default {
  async loginUser(login: string): Promise<any> {
    return await data.findOne({ name: login });
  },
};
