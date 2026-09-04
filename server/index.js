import { app } from './app.js';
import { Product, connectDatabase } from './db/database.js';
import { seedDatabase } from './db/seed.js';

const port = Number(process.env.PORT || 4000);

async function start() {
  const conn = await connectDatabase();
  const isMongo = conn && conn.readyState === 1;
  if (isMongo) {
    if (await Product.countDocuments() === 0) await seedDatabase();
    console.log(`1Fi Marketplace API running on http://localhost:${port} (MongoDB)`);
  } else {
    console.log(`1Fi Marketplace API running on http://localhost:${port} (In-Memory Fallback)`);
  }
  app.listen(port);
}

start().catch((error) => {
  console.error('Unable to start API server', error);
  process.exitCode = 1;
});
