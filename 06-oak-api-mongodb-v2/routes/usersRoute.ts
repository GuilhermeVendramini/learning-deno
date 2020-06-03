import UsersController from "../controllers/UsersController.ts";
import router from "./router.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

router
  .get("/users", authMiddleware.authorized, UsersController.getUsers)
  .get(
    "/users/current",
    authMiddleware.authorized,
    UsersController.getCurrentUser,
  )
  .get<{ id: string }>(
    "/users/:id",
    authMiddleware.authorized,
    UsersController.getUser,
  )
  .post("/users", authMiddleware.authorized, UsersController.addUser)
  .put("/users", authMiddleware.authorized, UsersController.addUser)
  .delete<{ id: string }>(
    "/users/:id",
    authMiddleware.authorized,
    UsersController.removeUser,
  );

export default router;
