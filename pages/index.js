import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta 
            name="description"
            content='Browse and join React meetups in your city'
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
  const client = await MongoClient.connect(
    'mongodb+srv://clintonmbonu:%40BU0m%40Sm1l3s@cluster0.dgoti1e.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();
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
