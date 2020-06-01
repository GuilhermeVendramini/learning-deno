import AuthController from "../controllers/AuthController.ts";
import router from "./router.ts";

router
  .post("/login", AuthController.login);

export default router;
