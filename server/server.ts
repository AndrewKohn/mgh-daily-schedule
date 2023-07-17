require('dotenv').config();
const express = require('express');
import { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const currentDate = new Date();
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Chicago',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const dateFormat = `${currentDate.getMonth()}/${currentDate.getDay()}/${currentDate.getFullYear()}`;
  const centralTime = currentDate.toLocaleString('en-US', timeOptions);
  const urlPath: string = req.baseUrl + req.originalUrl;

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    console.log(
      `${dateFormat} ${centralTime}: ${responseTime}ms | [${req.method}] (${res.statusCode}) ${urlPath}`
    );
  });

  next();
});
app.use('/daily_schedule', require('./routes/DailyScheduleRoutes'));
app.use('/clearview', require('./routes/ClearviewScheduleRoutes'));
app.use('/williston', require('./routes/WillistonScheduleRoutes'));
app.use('/patients', require('./routes/PatientsRoutes'));

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: 'Server error!  Something went wrong...',
    stack: `${err.stack}`,
    name: `${err.name}`,
    code: `${err.code}`,
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is currently listening to PORT: ${PORT}`);
});
