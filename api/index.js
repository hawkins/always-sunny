const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const Series = require("./series");
const episodes = require("./episodes");

/* GraphQL Schema */
const schema = buildSchema(`
  type Query {
    getEpisode(season: Int!, episode: Int!): Episode
    getEpisodes(season: Int, lead: String, guest: String, writer: String): [Episode]
    getSeason(season: Int!): Season
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

/* GraphQL Query Resolvers */
const rootValue = {
  getEpisode: ({ season, episode }) => {
    let candidates = episodes.filter(
      ep => ep.season === season && ep.episode === episode
    );
    if (candidates.length > 0) return candidates[0];
    else return null;
  },
  getEpisodes: ({ lead, writer, season, guest }) => {
    return episodes.filter(ep => {
      if (season && ep.season !== season) return false;
      if (lead && ep.lead.indexOf(lead) === -1) return false;
      if (guest && ep.guest.indexOf(guest) === -1) return false;
      if (writer && ep.writers.indexOf(writer) === -1) return false;
      return true;
    });
  },
  getSeason: ({ season }) => {
    return Series[season - 1];
  }
};

/* Express App */
const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema,
    rootValue: rootValue,
    graphiql: true
  })
);

/* Rock 'n' Roll */
app.listen(process.env.PORT);
