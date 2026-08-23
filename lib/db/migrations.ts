import { type SQLiteDatabase } from "expo-sqlite";

export const DATABASE_NAME = "leaf.db";

const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE memories (
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
}
