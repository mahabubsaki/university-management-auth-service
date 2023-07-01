import { format as dateFormat } from 'date-fns';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;



//custom log 
const myFormat = printf(({ level, message, timestamp }) => {
    return `Date : [${new Date(timestamp).toDateString().split(' ')[0]} - ${dateFormat(new Date(timestamp), 'PPpp')}] | ${level} : ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'PHU-SUCCESS' }),
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', 'succeses', 'phu-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});

export const errorLogger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'PHU-ERROR' }),
        timestamp(),
        myFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'phu-%DATE%-errors.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
});


