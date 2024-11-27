import pgPromise from 'pg-promise';
import { join } from 'path';
import { QueryFile } from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres";
const pgp = pgPromise();
const db = pgp(databaseUrl);

// const filePath = join(__dirname, 'create-tables.sql');
// const query = new QueryFile(filePath, { minify: true });
//
// db.query(query)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

export default db;