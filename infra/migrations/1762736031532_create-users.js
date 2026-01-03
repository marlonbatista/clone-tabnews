exports.up = (pgm) => {
  pgm.createTable(
    "users",
    {
      id: {
        type: "uuid",
        primaryKey: true,
        default: pgm.func("gen_random_uuid()"),
      },
      // For reference, GitHub username max length is 39 characters
      username: {
        type: "varchar(30)",
        notNull: true,
        unique: true,
      },
      email: {
        type: "varchar(254)",
        notNull: true,
        unique: true,
      },
      // Why 60 characters? bcrypt hashes are 60 characters long  https://www.npmjs.com/package/bcryptjs
      password: {
        type: "varchar(60)",
        notNull: true,
      },
      created_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("timezone('utc', now())"),
      },
      update_at: {
        type: "timestamptz",
        notNull: true,
        default: pgm.func("timezone('utc', now())"),
      },
    },
    { ifNotExists: true },
  );
};

exports.down = false;
