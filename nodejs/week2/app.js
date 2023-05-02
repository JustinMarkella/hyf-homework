const { error } = require("console");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Support parsing JSON requests
app.use(express.json());
// Importig our doc json
const documents = require("./documents.json");
// If q is not provided, the endpoint should return all documents.
// If q is provided, the endpoint should return the documents with some field that matches the value of q.
app.get("/", (req, res) => {
  res.send("This is a search engine");
});
app.get("/search", (req, res) => {
  try {
    const userQuery = req.query.q.toLowerCase();
    const filteredDocument = documents.filter((info) => {
      for (const [key, value] of Object.entries(info)) {
        const valueString = String(value).toLowerCase();
        const keyString = String(key).toLowerCase();
        if (keyString.includes(userQuery) || valueString.includes(userQuery)) {
          return true;
        }
      }
    });
    res.json({ data: filteredDocument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /documents/:id
app.get("/documents/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const filteredDocument = documents.filter((info) => {
      for (const [key, value] of Object.entries(info)) {
        if (value === id) {
          return info;
        }
      }
    });
    if (filteredDocument.length === 0) {
      res.status(404).end("404 Not Found");
    } else {
      res.json({ data: filteredDocument });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST / search;
app.post("/search", (req, res) => {
  try {
    const userFields = req.body.fields;
    const userQuery = req.query.q;
    // Checking if both q and fields are provided
    if (userFields && userQuery) {
      res.status(400).end("400 Bad Request");
    } else if (userFields) {
      const filteredData = documents.filter((item) => {
        for (const [key, value] of Object.entries(userFields)) {
          if (item[key] != value) {
            return false;
          }
        }
        return true;
      });
      return res.json(filteredData);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
