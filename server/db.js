import postgres from 'postgres'
import dotenv from 'dotenv';

const connectionString = process.env.DATABASE_URL
const pool = postgres(connectionString)

export default pool;