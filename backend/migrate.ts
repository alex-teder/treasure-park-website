import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, connection } from "./src/db";


async function main() {
    console.log("Starting migration...");
    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        await connection.end();
        console.log("Migration completed.");
    } catch (err) {
        console.error(err);
    }
}

main();
