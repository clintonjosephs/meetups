import { MongoClient } from 'mongodb';

export const ConnectToDB = async () => {
  const client = await MongoClient.connect(
    process.env.CONNECTION_STRING
  );
  const db = client.db();
  const collection = db.collection('meetups');

  return { collection, client };
};

export const CloseConnection = async (client) => {
    client.close();
}
