const Sunny = require("../src/data/Sunny");
const EpisodeDetails = require("../src/data/EpisodeDetails");
const fs = require("fs");

function getEpisodeDetails(s, ep) {
  let details = {};
  for (var i = 0; i < EpisodeDetails.length; i++) {
    if (s === EpisodeDetails[i].season && ep === EpisodeDetails[i].episode) {
      details = EpisodeDetails[i];
    }
  }

  // Attach info from Sunny
  const SunnyInfo = Sunny[s - 1].episodes[ep - 1];
  details.title = SunnyInfo.title;
  details.description = SunnyInfo.synopsis;
  details.link = "https://www.netflix.com/watch/" + SunnyInfo.episodeId;

  return details;
}

const Series = Sunny.map((season, s) => ({
  ...season,
  episodes: season.episodes.map((ep, e) => getEpisodeDetails(s + 1, e + 1))
}));

fs.writeFileSync(
  "./src/data/series.js",
  "module.exports = " + JSON.stringify(Series) + ";\n"
);
