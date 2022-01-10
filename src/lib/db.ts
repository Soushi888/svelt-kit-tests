import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env['MONGODB_URI'];
let client, clientPromise;

if (!uri) {
	throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env['NODE_ENV'] === 'development') {
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	client = new MongoClient(uri);
	clientPromise = client.connect();
}


export default clientPromise as MongoClient;
