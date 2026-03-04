import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

export async function query<T = any>(text: string, params: any[] = []) {
    const rows = await sql.query(text, params) as T[];
    return { rows, rowCount: rows.length };
}

