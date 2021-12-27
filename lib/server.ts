// lib/server.ts
import app from "./app";
import {database} from './config/database';


const PORT = process.env.PORT || 3000;

(async () => {
  await database.sync({force: true});
  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
})();
