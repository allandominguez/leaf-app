import Database from "better-sqlite3";
import type { SQLiteDatabase } from "expo-sqlite";

import { migrateDbIfNeeded } from "./migrations";

function createTestDb(): { db: Database.Database; adapter: SQLiteDatabase } {
  const db = new Database(":memory:");
  const adapter = {
    getFirstAsync: async <T>(sql: string) =>
      (db.prepare(sql).get() as T) ?? null,
    execAsync: async (sql: string) => {
      db.exec(sql);
    },
  } as unknown as SQLiteDatabase;

  return { db, adapter };
}

describe("migrateDbIfNeeded", () => {
  test("creates the memories table with the expected columns", async () => {
    const { db, adapter } = createTestDb();

    await migrateDbIfNeeded(adapter);

    const columns = db.prepare("PRAGMA table_info(memories)").all() as {
      name: string;
    }[];
    expect(columns.map((c) => c.name)).toEqual([
      "id",
      "content",
      "created_at",
      "updated_at",
    ]);
  });

  test("sets the schema version after migrating", async () => {
    const { db, adapter } = createTestDb();

    await migrateDbIfNeeded(adapter);

    const result = db.prepare("PRAGMA user_version").get() as {
      user_version: number;
    };
    expect(result.user_version).toBe(1);
  });

  test("running the migration twice does not error", async () => {
    const { adapter } = createTestDb();

    await migrateDbIfNeeded(adapter);

    await expect(migrateDbIfNeeded(adapter)).resolves.not.toThrow();
  });
});
