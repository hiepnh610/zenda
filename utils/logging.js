const logData = (req) => {
  return {
    "ts": Date.now(),
    "client_ip": req.connection.remoteAddress || null,
    "request_path": req.url,
    "request_method": req.method
  };
};

const logging = {
  info: (req, payload) => {
    const defaultLog = logData(req);
    const newLog = {
      "msg": payload.msg,
      "level": "INFO",
      "response_status": 200,
      "execution_time": payload.execution_time
    };
    const combineLog = Object.assign(defaultLog, newLog);

    console.log('-'.repeat(79));
    console.log(JSON.stringify(combineLog));
    console.log('-'.repeat(79));
  },

  error: (req, payload) => {
    const defaultLog = logData(req);
    const newLog = {
      "msg": payload.msg,
      "level": "ERROR",
      "response_status": 400,
      "execution_time": payload.execution_time
    };
    const combineLog = Object.assign(defaultLog, newLog);

    console.log('-'.repeat(79));
    console.log(JSON.stringify(combineLog));
    console.log('-'.repeat(79));
  }
};

module.exports = {
  logging
};
