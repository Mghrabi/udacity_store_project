import client from "../db/db";

type Order = {
  id: number;
  userId: number;
  status: string;
};

export class OrderModel {

  async create(order: Order): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *;";
      const result = await connnection.query(sql, [order.userId, order.status]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating order, err: ${err as string}`);
    }
  }

  async getOrdersByUserId(userId: number): Promise<Order[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM orders WHERE userId=$1;";
      const result = await connnection.query(sql, [userId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }

  // [Extra] dangerous (ON DELETE CASCADE)
  async delete(orderId: string): Promise<Order[] | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "DELETE FROM orders where id=$1;";
      const result = await connnection.query(sql, [orderId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating Order, err: ${err as string}`);
    }
  }

  async addorder(orderId: number, orderId: number, quantity: number): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO orders_orders (orderId, orderId, quantity) VALUES ($1, $2, $3) RETURNING *;";
      const result = await connnection.query(sql, [orderId, orderId, quantity]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in adding Order to an order, err: ${err as string}`);
    }
  }
  
  //optional method
  async getCompletedOrdersByUserId(userId: number): Promise<Order[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM orders WHERE userId=$1 AND status=complete;";
      const result = await connnection.query(sql, [userId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }

  //optional method
  async setOrderStatus(orderId: number, userId: number, status: string): Promise<Order | void> {
    try {
      const connnection = await client.connect();
      const sql = "UPDATE orders SET status=$1 WHERE orderId=$2 AND userId=$3;";
      const result = await connnection.query(sql, [status, orderId, userId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching order with userId ${userId}, err: ${err as string}`
      );
    }
  }

}
