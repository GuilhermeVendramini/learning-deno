import vs from "https://deno.land/x/value_schema/mod.ts";

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
  age: vs.number({
    minValue: 0,
  }),
};

export default personSchema;
