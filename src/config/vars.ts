import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = Joi.object()
  .keys({
    ENV: Joi.string()
      .description('The current environment')
      .default('development')
      .valid('development', 'production'),
    PORT: Joi.number()
      .description('The port on which server is running')
      .default(3000),
    DEBUG_LEVEL: Joi.string()
      .description('A debugging level for the application')
      .default('combined'),
    JSON_MAX_SIZE: Joi.string()
      .description(
        'The maximum size for JSON data that the application can handle'
      )
      .default('16mb'),
    MONGO_DB_URI: Joi.string()
      .description('MongoDB connection string')
      .default('mongodb://0.0.0.0:27017/qezy'),
    JWT_SECRET: Joi.string()
      .description('Jwt secret key')
      .default('s0methingvErysecretand@wesome'),
    PASSWORD_HASH_KEY: Joi.string()
      .description('A hash key for password')
      .default('dg4%M67&vhT'),
    CORS_ORIGIN: Joi.string()
      .description(
        'The origin address from the client side that the server can be accessed, can be splitted by comma if there are more than one origin'
      )
      .default('*'),
    SMTP_USERNAME: Joi.string().description('App email address').required(),
    SMTP_PASSWORD: Joi.string()
      .description('App email smtp password')
      .required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Env validation error: ${error.message}`);
}

export default {
  env: envVars.ENV,
  smtp: {
    username: envVars.SMTP_USERNAME,
    password: envVars.SMTP_PASSWORD,
  },
  server: {
    port: envVars.PORT,
    debugLevel: envVars.DEBUG_LEVEL,
    jsonMaxSize: envVars.JSON_MAX_SIZE,
    corsOrigin: envVars.CORS_ORIGIN,
  },
  db: {
    mongoDbUri: envVars.MONGO_DB_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
  },
  passwordHashKey: envVars.PASSWORD_HASH_KEY,
};
