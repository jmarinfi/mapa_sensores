import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    console.log('Host de la base de datos:', process.env.DB_HOST);
    return {};
}