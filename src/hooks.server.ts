import { testConnection } from '$lib/server/database/mysql';
import { config } from 'dotenv';

// Cargar variables de entorno desde el archivo .env
config();

// Probar la conexión a la base de datos al iniciar el servidor
testConnection();