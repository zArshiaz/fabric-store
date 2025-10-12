import "dotenv/config";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

const port = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB(process.env.MONGODB_URI);
  const app = createApp();
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}

bootstrap();
