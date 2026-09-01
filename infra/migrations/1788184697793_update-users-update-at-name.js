/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  // Check if the column exists before renaming
  const checkColumn = `
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'users'
      AND column_name = 'update_at';
  `;

  const result = await pgm.db.query(checkColumn);

  if (result.rowCount > 0) {
    // table, old column name, new column name
    pgm.renameColumn("users", "update_at", "updated_at");
  }
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  // Check if the column exists before renaming
  const checkColumn = `
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'users'
      AND column_name = 'update_at';
  `;
  const result = await pgm.db.query(checkColumn);

  if (result.rowCount > 0) {
    pgm.renameColumn("users", "updated_at", "update_at");
  }
  // table, old column name, new column name
};
