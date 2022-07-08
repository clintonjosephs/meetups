import React from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = ({ meetupData }) => {
  return (
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [{ params: { meetupId: 'm1' } }, { params: { meetupId: 'm2' } }],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  // you always return an object
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'Meetup 1',
        address: 'Meetup address',
        description: 'This is a description of the Meetup',
      },
    },
  };
}

export default MeetupDetails;
