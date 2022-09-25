import client from "../db/db";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  hash: string;
};

export class UserModel {

  async index(): Promise<User[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all usres, err: ${err as string}`);
    }
  }

  async show(id: string): Promise<User | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM users WHERE id=$1;";
      const result = await connnection.query(sql, [id]);
      connnection.release();
      return result.rows[0];
    } catch (err) {
      console.log("err");
      throw new Error(`err in fetching user with id ${id}, err: ${err as string}`);
    }
  }

  async create(user: User): Promise<User | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *";
      const result = await connnection.query(sql, [
        user.firstname,
        user.lastname,
        user.hash,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err) {
      console.log("err");
      throw new Error(`err in creating user, err: ${err as string}`);
    }
  }

}
