import DB from "../DB.ts";
import Person from "../../../models/PersonModel.ts";

const data = DB.collection("users");

export default {
  async findAllUsers(): Promise<any> {
    return await data.find();
  },

  async insertUser(user: Person): Promise<any> {
    return await data.insertOne(user);
  },

  async findUser(id: number): Promise<any> {
    return await data.findOne({ id: id });
  },

  async updateUser(user: Person): Promise<any> {
    return await data.updateOne(
      { id: user.id },
      { $set: { name: user.name, password: user.password } },
    );
  },

  async deleteUser(id: number): Promise<any> {
    return await data.deleteOne({ id: id });
  },
};
