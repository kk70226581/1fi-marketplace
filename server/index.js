import { app } from './app.js';
import { Product, connectDatabase } from './db/database.js';
import { seedDatabase } from './db/seed.js';

const port = Number(process.env.PORT || 4000);

async function start() {
  await connectDatabase();
  if (await Product.countDocuments() === 0) await seedDatabase();
  app.listen(port, () => console.log(`1Fi Marketplace API running on http://localhost:${port} (MongoDB)`));
}

start().catch((error) => {
  console.error('Unable to start the MongoDB-backed API', error);
  process.exitCode = 1;
});
