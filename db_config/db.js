import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './db_config/foodie-gram.sqlite3',
  driver: sqlite3.Database
});

export default dbPromise;