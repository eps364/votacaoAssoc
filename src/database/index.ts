import { createConnection } from 'typeorm';
import 'reflect-metadata';

createConnection()
  .then(async connection => {
    console.log('Conexão criada!');
  })
  .catch(error => console.log(error));
