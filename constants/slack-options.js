const SLACK_APP_OPTIONS = {
  botToken: process.env.SLACK_BOT_TOKEN,
  clientSigningSecret: process.env.SLACK_SIGNING_SECRET,
  scopes: ['commands,users:read.email,users:read,users.profile:read,incoming-webhook']
};

module.exports = {
  SLACK_APP_OPTIONS
};
