import z from "zod";

const schema = z.object({
  name: z.string(),
  price: z.number().default(0),
});

export default schema;
