import chalk from 'chalk';
import { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';

/**
 * A middleware module to save all the API processing details to a logger file (i.e. loggerFile.txt),
 * from its inception onwards.
 *
 * The details also serves as a protection measure against hacking attacks, as among the details
 * being stored are the remote IP Address from which the request was made, parameters entered by
 * the user, and the date and time when the request was made.
 * */
const writeDataToLoggerFile = async (data: string) => {
  const loggerFile = await fsPromises.open(
    path.join(__dirname, '..', '..', 'assets', 'loggerFile.txt'),
    'a+'
  );
  //attach the details of the (newly) conducted image processing to the already exiting ones, if there is any.
  await loggerFile.write(data);
  await loggerFile.close();
};

const logger = (req: Request, res: Response, next: () => void): void => {
  //creating a Date object to be used to determine the date and exact time of the processing taking place
  const d = new Date();
  const newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
  const newTime = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  //if the user provides no entries, then in this case it will be entered as "no entries"
  if (Object.keys(req.query).length === 0) {
    const loggerMessage = `\nRequest type: ${req.method}, Visited URL: "${req.originalUrl}", User parameters: no entries, 
    User IP address: ${req.ip}, Date: ${newDate}, Time: ${newTime}\n`;
    console.log(chalk.bgMagenta.whiteBright(loggerMessage));
    //write the details to assets/loggerFile.txt
    writeDataToLoggerFile(loggerMessage);
  } else {
    const loggerMessage = `\nRequest type: ${req.method}, Visited URL: "${
      req.originalUrl
    }", User parameters: ${JSON.stringify(
      //turing the query object into a string.
      req.query
    )}, User IP address: ${req.ip}, Date: ${newDate}, Time: ${newTime}\n`;
    console.log(chalk.bgMagenta.whiteBright(loggerMessage));
    //write the details to assets/loggerFile.txt
    writeDataToLoggerFile(loggerMessage);
  }
  next();
};

export default logger;
