import db from "../db.ts";
import person from "../../../models/person_model.ts";

const data = db.collection("users");

const findAllUsers = async (): Promise<any> => {
  return await data.find();
};

const insertUser = async (user: person): Promise<any> => {
  return await data.insertOne(user);
};

const findUser = async (id: number): Promise<any> => {
  return await data.find({ id: id });
};

const updateUser = async (user: person): Promise<any> => {
  return await data.updateOne(
    { id: user.id },
    { $set: { name: user.name, age: user.age } },
  );
};

const deleteUser = async (id: number): Promise<any> => {
  return await data.deleteOne({ id: id });
};

export { findAllUsers, insertUser, findUser, updateUser, deleteUser };
