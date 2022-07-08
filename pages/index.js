import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'Meetup 1',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    address: '123 Main St, New York, NY 10001',
    description: 'This is a description of the meetup',
  },
  {
    id: 'm2',
    title: 'Meetup 2',
    image:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    address: '123 Main St, New York, NY 10001',
    description: 'This is a description of the meetup',
  },
];

const HomePage = ({ meetups }) => {
  return <MeetupList meetups={meetups} />;
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
    const client = await MongoClient.connect('mongodb+srv://clintonmbonu:%40BU0m%40Sm1l3s@cluster0.dgoti1e.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1 // revalidate after 1 second
    };
}

export default HomePage;
