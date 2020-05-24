const SLACK_APP_OPTIONS = {
  botToken: process.env.SLACK_BOT_TOKEN,
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET
};

module.exports = {
  SLACK_APP_OPTIONS
};
