import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'
import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://varulvsnatt:varulvsnatt@cluster0.m2aur.mongodb.net/nextJSmeetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://varulvsnatt:varulvsnatt@cluster0.m2aur.mongodb.net/nextJSmeetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupid = context.params.meetupId;
  const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupid)})
  console.log(meetup, 'meetup');

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description
      }
      },
    
  };
}

export default MeetupDetails;
