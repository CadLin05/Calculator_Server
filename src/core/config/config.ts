import { type Config } from "./types.js";

const config: Config = {
  server: {
    host: "localhost",
    port: 3000,
  },
  database: {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    schema: "calc_data",
  },
};



export default config;