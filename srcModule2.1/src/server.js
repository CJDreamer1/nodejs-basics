// "dev": "nodemon srcModule2.1/index.js" в package.json потрібно замінити на "dev": "nodemon src/index.js"
import pino from 'pino-http'; // бібліотека для роботи із консоллю
import cors from 'cors'; //бібліотека для захисту
import express from 'express'; // ця штука буде парсити JSON-дані наших запитів

import { getAllStudents, getStudentById } from './services/students.js';
import { env } from './utils/env.js';

const app = express();
// Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// наприклад, у запитах POST або PATCH
app.use(express.json());
app.use(cors()); // цей мідлвер відповідає за безпеку CORS

const PORT = Number(env('PORT', '3000')); //Для доступу до змінних оточення в середовищі Node.js використовується глобальний об'єкт process.env // Читаємо змінну оточення PORT
// змінна оточення завжди рядок. Тому ми вказуємо якого типу мають бути дані  - Number().

export const startServer = () => {
  //експортуємо сервер для index.js
  // Middleware pino слід вставляти в код якомога раніше
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Middleware для логування часу запиту
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, World!',
    });
  });

  // Middleware для обробких помилок (приймає 4 аргументи)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res, next) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    // Відповідь, якщо контакт не знайдено
    if (!student) {
      res.status(404).json({
        message: 'Student not found',
      });
      return;
    }

    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: student,
    });
  });
};
