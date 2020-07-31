const crypto = require('crypto');
const qs = require('qs');

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;

const signSlackVerification = (req, res, next) => {
  const slackSignature = req.headers['x-slack-signature'];
  const requestBody = qs.stringify(req.body, { format: 'RFC1738' });
  const timestamp = req.headers['x-slack-request-timestamp'];

  if (slackSignature && requestBody && timestamp) {
    const time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - timestamp) > 300) {
      return res.status(400).send('Ignore this request.');
    }

    if (!slackSigningSecret) {
      return res.status(400).send('Slack signing secret is empty.');
    }

    const sigBasestring = 'v0:' + timestamp + ':' + requestBody;
    const mySignature =
      'v0=' +
      crypto
        .createHmac('sha256', slackSigningSecret)
        .update(sigBasestring, 'utf8')
        .digest('hex');

    if (
      crypto.timingSafeEqual(
        Buffer.from(mySignature, 'utf8'),
        Buffer.from(slackSignature, 'utf8')
      )
    ) {
      next();
    }

    return res.status(400).send('Verification failed');
  }

  return res.status(400).send('Verification failed');
};

module.exports = signSlackVerification;
