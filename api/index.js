const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const Series = require("../src/data/series");

/* GraphQL Schema */
const schema = buildSchema(`
  type Query {
    episode(season: Int!, episode: Int!): Episode
  }

  type Episode {
    season: Int!
    episode: Int!
    part: String
    lead: [String]!
    guest: [String]
    writers: [String]!
    title: String!
    description: String!
    link: String!
  }

  type Season {
    title: String!
    year: Int!
    episodes: [Episode]!
    shortName: String!
    longName: String!
  }
`);

const episode = ({ season, episode }) => {
  return Series[season - 1].episodes[episode - 1];
};

/* Express App */
const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema,
    rootValue: { episode },
    graphiql: true
  })
);

/* Rock 'n' Roll */
const port = process.env.NODE_ENV === "production" ? 80 : 3000;
app.listen(port);
