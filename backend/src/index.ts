import express from "express";
import bodyParser from "body-parser";
import exampleRoutes from "./routes/example.routes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", exampleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
