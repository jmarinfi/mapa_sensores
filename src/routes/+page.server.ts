import type { PageServerLoad } from './$types';
import { getActiveSensors } from '$lib/server/services/sensorService';

export const load: PageServerLoad = async () => {
    try {
        const sensores = await getActiveSensors();
        return { sensores };
    } catch (err) {
        console.error('Error al obtener sensores en la función load:', err);
        return {
            sensores: [],
            error: 'No se pudieron cargar los sensores activos.'
        }
    }
};