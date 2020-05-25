import db from "../db.ts";
import person from "../../../models/person_model.ts";

const data = db.collection("users");

async function findAllUsers(): Promise<any> {
  return await data.find();
}

async function insertUser(user: person): Promise<any> {
  return await data.insertOne(user);
}

async function findUser(id: number): Promise<any> {
  return await data.find({ id: id });
}

async function updateUser(user: person): Promise<any> {
  return await data.updateOne(
    { id: user.id },
    { $set: { name: user.name, age: user.age } },
  );
}

async function deleteUser(id: number): Promise<any> {
  return await data.deleteOne({ id: id });
}

export { findAllUsers, insertUser, findUser, updateUser, deleteUser };
