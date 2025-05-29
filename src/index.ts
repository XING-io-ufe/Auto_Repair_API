import dotenv from 'dotenv';
import app from './root';

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Сервер localhost: ${PORT} порт дээр аслаа!`));