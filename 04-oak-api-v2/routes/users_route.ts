import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
} from "../controllers/users_controller.ts";
import router from "./router.ts";

const userRouter = router;

userRouter
  .get("/", (context) => {
    context.response.body = "Home";
  })
  .get("/users", getUsers)
  .get<{ id: string }>("/users/:id", getUser)
  .post("/users", addUser)
  .put("/users", addUser)
  .delete<{ id: string }>("/users/:id", deleteUser);

export default userRouter;
