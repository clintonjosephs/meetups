import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { CloseConnection, ConnectToDB } from '../db/connection';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse and join React meetups in your city"
        />
      </Head>
      <MeetupList meetups={meetups} />;
    </>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API or DB
  // you always return an object
  const connectionObj = await ConnectToDB();
  const meetupsCollection = connectionObj.collection;

  const meetups = await meetupsCollection.find().toArray();

  CloseConnection(connectionObj.client);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // revalidate after 1 second
  };
}

export default HomePage;
