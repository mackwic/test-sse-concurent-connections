const express = require("express");

const app = express();
app.use(express.static("public"));

let connection_counter = 0;
const COUNTER_BASE = process.env.COUNTER_BASE || 1_000_000;
const SLEEP_TIME_MS = process.env.SLEEP_TIME_MS || 1_000;

app.get("/countdown", function (req, res) {
  connection_counter += 1;

  req.on("end", () => (connection_counter -= 1));
  req.on("close", () => (connection_counter -= 1));
  req.on("error", (err) => console.error(err));
  res.on("close", () => (connection_counter -= 1));
  res.on("error", (err) => console.error(err));

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  countdown(res, COUNTER_BASE);
});

function countdown(res, count) {
  res.write(`conn: ${connection_counter} | data: ${count}\n\n`);
  if (count > 0) setTimeout(() => countdown(res, count - 1), SLEEP_TIME_MS);
  else {
    connection_counter -= 1;
    res.end();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SSE app listening on port 3000!"));
