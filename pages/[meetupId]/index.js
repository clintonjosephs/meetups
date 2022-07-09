import { ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { ConnectToDB, CloseConnection } from '../../db/connection';

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const connectionObj = await ConnectToDB();
  const meetupsCollection = connectionObj.collection;

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  CloseConnection(connectionObj.client);
  return {
    fallback: false,
    paths: [
      ...meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const connectionObj = await ConnectToDB();

  const meetupsCollection = connectionObj.collection;

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  CloseConnection(connectionObj.client);

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  };
}

export default MeetupDetails;
