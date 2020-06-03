import vs from "value_schema";

const authSchema = {
  username: vs.string({
    minLength: 2,
    maxLength: {
      length: 100,
      trims: false,
    },
  }),
  password: vs.string({
    minLength: 8,
  }),
};

export default authSchema;
