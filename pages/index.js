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

const HomePage = () => {
  return <MeetupList meetups={DUMMY_DATA} />;
};

export default HomePage;