const { DataSource } = require("typeorm");
const { Contact } = require("./models/Contact");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "joy",
  password: "password",
  database: "bitespeed",
  synchronize: true,
  logging: false,
  entities: [Contact],
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };
