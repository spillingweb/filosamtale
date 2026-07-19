import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '6eb00f677fca350d8c310bc4d413754f5b686ae7', queries,  });
export default client;
  