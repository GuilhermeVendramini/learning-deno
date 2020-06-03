import vs from "value_schema";

const personSchema = {
  id: vs.number({
    minValue: 0,
  }),
  name: vs.string({
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

export default personSchema;
