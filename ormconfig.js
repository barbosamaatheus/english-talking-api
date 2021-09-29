const production = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  schema: "public",
  entities: ["dist/src/models/*.js"],
  migrations: ["dist/src/database/migrations/*.js"],
  migrationsRun: true,
  logging: false,
  ssl: true,
};

const development = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsRun: true,
};

const tests = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  migrationsRun: true,
};

const base = {
  production,
  development,
  tests,
};

module.exports = {
  ...base[process.env.NODE_ENV || "development"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  },
};
