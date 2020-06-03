import AuthController from "../controllers/AuthController.ts";
import router from "./router.ts";

router
  .post("/login", AuthController.login)
  .get("/login", AuthController.loginView)
  .get("/logout", AuthController.logout);

export default router;
