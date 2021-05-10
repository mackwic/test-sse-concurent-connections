const express = require("express");

const app = express();
app.use(express.static("public"));

let connection_counter = 0;
const COUNTER_BASE = 500;

app.get("/countdown", function (req, res) {
  connection_counter += 1;
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  countdown(res, COUNTER_BASE);
});

function countdown(res, count) {
  res.write(`conn: ${connection_counter} | data: ${count}\n\n`);
  if (count > 0) setTimeout(() => countdown(res, count - 1), 1000);
  else {
    connection_counter -= 1;
    res.end();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SSE app listening on port 3000!"));
