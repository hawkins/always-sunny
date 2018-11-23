const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const Series = require("./series");
const episodes = require("./episodes");

/* GraphQL Schema */
const typeDefs = gql`
  type Query {
    getEpisode(season: Int!, episode: Int!): Episode
    getEpisodes(
      season: Int
      lead: String
      guest: String
      writer: String
    ): [Episode]
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
`;

/* GraphQL Query Resolvers */
const resolvers = {
  Query: {
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
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

/* Express App */
const app = express();
server.applyMiddleware({ app });
app.get("/", (req, res) => {
  res.redirect("/graphql");
});

/* Rock 'n' Roll */
const port = process.env.NODE_ENV === "production" ? 80 : 3000;
app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
