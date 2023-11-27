import * as dotenv from "dotenv";
import * as path from "path";
import * as Joi from "joi";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MYSQL_HOST: Joi.string().required().description("Mysql connection Host"),
    MYSQL_PORT: Joi.number().default(3306),
    MYSQL_USER: Joi.string().default("root").required(),
    MYSQL_PASSWORD: Joi.string().required(),
    DATABASE_SCHEMA: Joi.string(),
    PRIVATE_KEY: Joi.string(),
    REDIS_HOST: Joi.string().required().description("Redis connection Host"),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().default(""),
    // METAMASK_MESSAGE: Joi.string(),
    JWT_SECRET: Joi.string(),
    CMC_API_KEY: Joi.string(),
    W2E_ENDPOINT: Joi.string(),
    W2E_ACCESS_KEY: Joi.string(),
    CHECKSUM_KEY: Joi.string(),

    VAULT_FACTORY: Joi.string(),
    VAULT_ADDRESS: Joi.string(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
  env: envVars.NODE_ENV,
  port: envVars.APP_PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    schema: envVars.DATABASE_SCHEMA,
  },
  w2e: {
    endpoint: envVars.W2E_ENDPOINT,
    access_key: envVars.W2E_ACCESS_KEY,
    checksum_key: envVars.W2E_CHECKSUM_KEY,
  },
  privateKey: envVars.PRIVATE_KEY,
  coinmarketcapApiKey: envVars.CMC_API_KEY,
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
    db: 0,
  },
  jwtSecret: envVars.JWT_SECRET || "",
  address: {
    vaultFactory: envVars.VAULT_FACTORY,
    vaultAddress: envVars.VAULT_ADDRESS,
  },
};
