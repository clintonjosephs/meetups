import { MongoClient } from 'mongodb';

export const ConnectToDB = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://clintonmbonu:%40BU0m%40Sm1l3s@cluster0.dgoti1e.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const collection = db.collection('meetups');

  return { collection, client };
};

export const CloseConnection = async (client) => {
    client.close();
}
