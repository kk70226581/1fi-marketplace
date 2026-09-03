import { app } from './app.js';

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`1Fi Marketplace API running on http://localhost:${port}`));
