import { config } from '../core/config';
import { DB } from '../core/framework';

export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Config:', config.db.uri);
    console.log('veritabani:', config.db.name);
    await DB.mongo.init(config.db.uri, config.db.name);
    console.log('dbname:', config.db.name);
    console.info('Mongodb initialised.');
  } catch (error) {
    console.error('Failed to initialize MongoDB:', error);
    throw error;
  }
}
