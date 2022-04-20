import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import path from 'path';

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const getLabel = function (callingModule: NodeModule) {
  let parts = callingModule.filename.split('\\');
  return parts[parts.length - 2] + '/' + parts.pop();
};

const logger = function(callingModule: NodeModule) {
  return createLogger({
    level: 'info',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      label({ label: getLabel(callingModule) }),
      logFormat,
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.File({ filename: `${path.resolve(__dirname, '..','logs', 'error.log')}`, level: 'error' }),
      new transports.File({ filename: `${path.resolve(__dirname, '..','logs', 'combined.log')}` }),
    ],
  });
}  

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger(module).add(new winston.transports.Console({
    format: combine(
      logFormat,
    )
  }));
}

  export default logger;