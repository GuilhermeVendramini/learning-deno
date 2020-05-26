import {
  Status,
} from "https://deno.land/x/oak/mod.ts";

export default (context: Record<string, any>) => {
  context.response.status = Status.NotFound;
  context.response.body = "Not Found";
};
