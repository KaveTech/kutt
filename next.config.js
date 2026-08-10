const { parsed: localEnv = {} } = require("dotenv").config();

const env = key => {
  const processValue = process.env[key];
  const value = processValue !== undefined && processValue !== null ? processValue : localEnv[key];

  if (value === undefined) {
    console.warn(`[next.config] ${key} is not defined in process.env or .env`);
  }

  return value;
};

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
