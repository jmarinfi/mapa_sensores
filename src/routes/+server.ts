import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getActiveSensors } from '$lib/server/services/sensorService';


export const GET: RequestHandler = async ({ url }) => {
    try {
        const sensors = await getActiveSensors();

        if (!sensors || sensors.length === 0) {
            throw error(404, 'No se encontraron sensores para la consulta de sensores activos.');
        }

        return json(sensors);
    } catch (err) {
        // Si el error ya es un error HTTP de SvelteKit, lo relanzamos
        if (err instanceof Error && 'status' in err) {
            throw err;
        }

        // Para otros errores, registramos y lanzamos un error 500 genérico
        console.error('Error al obtener sensores activos:', err);
        throw error(500, 'Error interno del servidor al obtener sensores activos.');
    }
};