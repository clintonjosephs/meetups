import { CloseConnection, ConnectToDB } from '../../db/connection';

// /api/new-meetup
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;

    const connectionObj = await ConnectToDB();
    const meetupsCollection = connectionObj.collection;

    const result = await meetupsCollection.insertOne(data);

    CloseConnection(connectionObj.client);

    res.status(201).json({ message: 'Meetup created successfully' });
  }
};

export default handler;
