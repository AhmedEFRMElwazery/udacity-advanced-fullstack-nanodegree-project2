import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import { SALT_ROUNDS, BCRYPT_PASS } from '../config/config';
import Client from '../database/database';
import { TUser } from '../types/user.type';

export class UserModel {
  async index(): Promise<TUser[]> {
    try {
      const conn = await Client.connect();
      const sqlQueryString = 'SELECT * FROM users_table';
      const queryOutcome = await conn.query(sqlQueryString);
      conn.release();

      return queryOutcome.rows;
    } catch (error) {
      throw new Error(
        `Error appeared while retrieving all users...Appeared in:\nClass: UserModel \nFunction: index\nError message: ${error}`
      );
    }
  }

  async show(id: number): Promise<TUser> {
    try {
      const conn = await Client.connect();
      const sqlQueryString = 'SELECT * FROM users_table WHERE id=($1)';
      const queryOutcome = await conn.query(sqlQueryString, [id]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error Appeared while retrieving a specific user with id: ${id}...Appeared in:\nClass: UserModel \nFunction: show\nError message: ${error}`
      );
    }
  }

  async create(user: TUser): Promise<TUser> {
    try {
      const { firstname, lastname, password } = user;
      const conn = await Client.connect();
      const sqlQueryString =
        'INSERT INTO users_table (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
      const hash = hashSync(
        password + BCRYPT_PASS,
        genSaltSync(Number(SALT_ROUNDS))
      );
      const queryOutcome = await conn.query(sqlQueryString, [
        firstname,
        lastname,
        hash,
      ]);
      conn.release();

      return queryOutcome.rows[0];
    } catch (error) {
      throw new Error(
        `Error appeared while creating a user named "${user.firstname} ${user.lastname}"...Appeared in:\nClass: UserModel \nFunction: create\nError message: ${error}`
      );
    }
  }

  async authenticate(user: TUser): Promise<TUser | null> {
    try {
      const { firstname, lastname, password } = user;
      const conn = await Client.connect();
      const sqlQueryString =
        'SELECT * FROM users_table WHERE firstName=($1) AND lastName=($2)';

      const queryOutcome = await conn.query(sqlQueryString, [
        firstname,
        lastname,
      ]);

      if (queryOutcome.rows.length) {
        const user = queryOutcome.rows[0];

        if (compareSync(password + BCRYPT_PASS, user.password)) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error appeared while authenticating a user...Appeared in:\nClass: UserModel \nFunction: authenticate\nError message: ${error}`
      );
    }
  }
}

export default UserModel;
