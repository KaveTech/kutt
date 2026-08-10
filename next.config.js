const { parsed: localEnv = {} } = require("dotenv").config();

const env = key => process.env[key] ?? localEnv[key];

module.exports = {
  // we are using the process env variables because in production we don't have access to the .env file
  publicRuntimeConfig: {
    CONTACT_EMAIL: env("CONTACT_EMAIL"),
    SITE_NAME: env("SITE_NAME"),
    DEFAULT_DOMAIN: env("DEFAULT_DOMAIN"),
    RECAPTCHA_SITE_KEY: env("RECAPTCHA_SITE_KEY"),
    REPORT_EMAIL: env("REPORT_EMAIL"),
    DISALLOW_ANONYMOUS_LINKS: env("DISALLOW_ANONYMOUS_LINKS"),
    DISALLOW_REGISTRATION: env("DISALLOW_REGISTRATION"),
    OPEN_GRAPH_TITLE: env("OPEN_GRAPH_TITLE"),
    OPEN_GRAPH_DESCRIPTION: env("OPEN_GRAPH_DESCRIPTION")
  }
};
