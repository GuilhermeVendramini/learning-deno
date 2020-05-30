import {
  Status,
} from "oak";

export default (context: Record<string, any>) => {
  context.response.status = Status.NotFound;
  context.response.body = "Not Found";
};
