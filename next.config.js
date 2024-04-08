const { parsed: localEnv } = require("dotenv").config();

module.exports = {
  // we are using the process env variables because in production we don't have access to the .env file
  publicRuntimeConfig: {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL ? process.env.CONTACT_EMAIL : localEnv.CONTACT_EMAIL,
    SITE_NAME: process.env.SITE_NAME ? process.env.SITE_NAME : localEnv.SITE_NAME,
    DEFAULT_DOMAIN: process.env.DEFAULT_DOMAIN ? process.env.DEFAULT_DOMAIN : localEnv.DEFAULT_DOMAIN,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY ? process.env.RECAPTCHA_SITE_KEY : localEnv.RECAPTCHA_SITE_KEY,
    REPORT_EMAIL: process.env.REPORT_EMAIL ? process.env.REPORT_EMAIL : localEnv.REPORT_EMAIL,
    DISALLOW_ANONYMOUS_LINKS: process.env.DISALLOW_ANONYMOUS_LINKS ? process.env.DISALLOW_ANONYMOUS_LINKS : localEnv.DISALLOW_ANONYMOUS_LINKS,
    DISALLOW_REGISTRATION: process.env.DISALLOW_REGISTRATION ? process.env.DISALLOW_REGISTRATION : localEnv.DISALLOW_REGISTRATION,
    OPEN_GRAPH_TITLE: process.env.OPEN_GRAPH_TITLE ? process.env.OPEN_GRAPH_TITLE : localEnv.OPEN_GRAPH_TITLE,
    OPEN_GRAPH_DESCRIPTION: process.env.OPEN_GRAPH_DESCRIPTION ? process.env.OPEN_GRAPH_DESCRIPTION : localEnv.OPEN_GRAPH_DESCRIPTION
  }
};
