import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
})

/**
 * Función genérica para ejecutar consultas a la base de datos.
 * @param sql La sentencia SQL a ejecutar.
 * @param params Los parámetros para la consulta.
 * @returns Las filas resultantes de la consulta.
 */
export async function queryDB(sql: string, params: any[] = []) {
    try {
        const [rows] = await connection.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('[DB ERROR]', error);
        throw new Error('Error en la consulta a la base de datos');
    }
}

/**
 * Función para verificar la conexión con la base de datos.
 */
export async function testConnection() {
    try {
        await connection.query('SELECT 1');
        console.log('Conexión a la base de datos MySQL exitosa');
        return true;
    } catch (error) {
        console.error('Error de conexión a la base de datos MySQL:', error);
        return false;
    }
}