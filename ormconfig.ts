module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsRun: true,
  entities: ["./src/models/*.[ts, js]"],
  migrations: ["./src/database/migrations/*.[ts, js]"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
