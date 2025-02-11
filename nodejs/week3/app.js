const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "hyf_node_week3_warmup",
    multipleStatements: true,
  },
});
knex.raw("SELECT VERSION()").then(() => {
  console.log(`connection to db successful!`);
});

const apiRouter = express.Router();
app.use("/api", apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use("/contacts", contactsAPIRouter);

contactsAPIRouter.get("/", async (req, res) => {
  try {
    let query = knex.select("*").from("contacts");
    console.log(req.query);
    if (req.query.sort === "first_name ASC") {
      query = knex.select("*").from("contacts").orderBy("first_name", "asc");
    } else if (req.query.sort === "last_name DESC") {
      query = knex.select("*").from("contacts").orderBy("last_name", "desc");
    }
    console.log("SQL", query.toSQL().sql);

    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
