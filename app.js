const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
// use Parser Middleware
app.use(express.json());

// use Logger middleware
app.use(function (req, res, next) {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  return next();
});

// Endpoint to perform a Full Text Search on lessons
app.get("/search/:collectionName", async function (req, res, next) {
  const topic = new RegExp(`.*${req.query.query}.*`, "gi");
  await req.collection.find({ topic: topic }).toArray((err, results) => {
    res.json(results);
    if (err) return next(err);
  });
});

// Listen to port
app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});
