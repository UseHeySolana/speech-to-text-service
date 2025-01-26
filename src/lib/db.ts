import mysql from "mysql2";
// Create a connection pool

const pool = mysql.createPool({
  host: "api.yraytestings.com.ng", // Your database host
  user: "yraytest_heysolana", // Your database user
  password: "4b&?.cDq9a*-", // Your database password
  database: "yraytest_heysolana", // Your database name
  port: 3306,
});

// Promisify the pool for easier use with async/await
const promisePool = pool.promise();

export default promisePool;
