// lib/config/database.ts
import { Sequelize } from "sequelize-typescript";


export const database = new Sequelize({
database: 'some_db',
/*  host: '192.168.0.18',
 dialect: 'mysql',
 username: 'roland',
 password: 'Zawazepmgr972@',
*/

 dialect: 'sqlite',
 storage: 'exia.sqlite',
models: [__dirname + '/../models/*.model.ts'],


});
