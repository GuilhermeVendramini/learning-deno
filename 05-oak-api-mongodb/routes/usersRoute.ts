import UsersController from "../controllers/UsersController.ts";
import router from "./router.ts";

router
  .get("/", (context) => {
    context.response.body = "Home";
  })
  .get("/users", UsersController.getUsers)
  .get("/users/current", UsersController.getCurrentUser)
  .get<{ id: string }>("/users/:id", UsersController.getUser)
  .post("/users", UsersController.addUser)
  .put("/users", UsersController.addUser)
  .delete<{ id: string }>("/users/:id", UsersController.removeUser);

export default router;
