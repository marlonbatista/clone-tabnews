import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors/error.js";

async function create(userInputValue) {
  await validateUser(userInputValue);

  const newUser = await runInserQuery(userInputValue);

  return newUser;

  async function runInserQuery(userInputValue) {
    const result = await database.query({
      text: `
          INSERT INTO 
            users (username, email, password) 
          VALUES ($1, $2, $3)
          RETURNING *
          ;`,
      values: [
        userInputValue.username,
        userInputValue.email,
        userInputValue.password,
      ],
    });

    return result.rows[0];
  }
}

async function findOneByUserName(username) {
  const user = await runSelectQuery(username);
  return user;
}

async function runSelectQuery(username) {
  const result = await database.query({
    text: `
        SELECT 
          *
        FROM 
          users 
        WHERE
          LOWER(username) = LOWER($1)
        LIMIT 
          1
        ;`,
    values: [username],
  });
  if (!result.rowCount > 0) {
    throw new NotFoundError({
      message: "User not found for the given username.",
      action: "Please check the username exists.",
    });
  }
  return result.rows[0];
}

async function validateUser(userInputValue) {
  await validateUniqueEmail(userInputValue.email);
  await validateUniqueUsername(userInputValue.username);
}

async function validateUniqueEmail(email) {
  const result = await database.query({
    text: `
            SELECT 
              email
            FROM 
              users 
            WHERE 
              LOWER(email) = LOWER($1)
            ;`,
    values: [email],
  });
  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "Email already in use.",
      action: "Please use a different email address.",
    });
  }
}

async function validateUniqueUsername(username) {
  const result = await database.query({
    text: `
          SELECT 
            username
          FROM 
            users 
          WHERE 
            LOWER(username) = LOWER($1)
          ;`,
    values: [username],
  });
  if (result.rowCount > 0) {
    throw new ValidationError({
      message: "Username already in use.",
      action: "Please use a different username.",
    });
  }
}

const user = {
  create,
  findOneByUserName,
};

export default user;
