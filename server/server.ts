require('dotenv').config();
const express = require('express');
import { Express, Request, Response, NextFunction } from 'express';
const app: Express = express();

app.use(express.json());

app.use('/daily_schedule', require('./routes/DailyScheduleRoutes'));

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: 'Server error!  Something went wrong...',
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is currently listening to PORT: ${PORT}`);
});
