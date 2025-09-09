import { queryDB } from '$lib/server/database/mysql';
import type { Sensor } from '$lib/types/sensor';

/**
 * Obtiene los sensores activos para una obra y tipo de instrumento específicos.
 * @returns Una promesa que resuelve con un array de sensores.
 */
export async function getActiveSensors(): Promise<Sensor[]> {
    const id_obra = '192';
    const id_tipo_instrumento = '71';

    const sql_query = `
        SELECT S.ID_SENSOR, S.NOM_SENSOR, S.ID_EXTERNO, S.DESCRIPCION, S.X, S.Y 
        FROM SENSOR S 
        WHERE ID_PRESA = ? AND ID_SISTEMA = ? AND ACTIVO = 1
    `;
    const params = [id_obra, id_tipo_instrumento];

    const rows = await queryDB(sql_query, params) as Sensor[];

    return rows;
}
