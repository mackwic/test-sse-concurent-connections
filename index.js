const express = require("express");

const app = express();
app.use(express.static("public"));

app.get("/countdown", function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  countdown(res, 120);
});

function countdown(res, count) {
  res.write("data: " + count + "\n\n");
  if (count > 0) setTimeout(() => countdown(res, count - 1), 1000);
  else res.end();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SSE app listening on port 3000!"));
