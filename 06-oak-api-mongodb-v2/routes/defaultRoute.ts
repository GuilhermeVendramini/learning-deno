import router from "./router.ts";
import { renderFileToString } from "dejs";
import authMiddleware from "../middleware/authMiddleware.ts";

router
  .get("/", authMiddleware.authorizedToken, async (context: Record<string, any>) => {
    const currentUser = context.state.currentUser;
    context.response.body = await renderFileToString(
      `${Deno.cwd()}/views/home.ejs`,
      {
        user: currentUser,
      },
    );
  });

export default router;
