import React from "react";
import Episode from "./Episode";
import Controls from "./Controls";
import Search from "./Search";
import Series from "../data/series";

const episodes = Series.map(s => s.episodes).reduce((a, b) => a.concat(b));

//------------------------------------------------------------------------------
// Helper functions to manage data
function getWriters(lead, season) {
  let list = [{ value: "All", count: 0 }];

  for (var i = 0; i < episodes.length; i++) {
    // Only consider episodes in correct season and with our lead character prominent
    if (
      (season === "All" || episodes[i].season === season) &&
      (lead === "All" || episodes[i].lead.indexOf(lead) !== -1)
    ) {
      // Increment 'All' count
      list[0].count++;

      for (let j = 0; j < episodes[i].writers.length; j++) {
        // Find writer in list and increment count
        for (let k = 0; k <= list.length; k++) {
          if (!list[k]) {
            // Add this writer to list
            list.push({ value: episodes[i].writers[j], count: 1 });
            break;
          }

          if (list[k].value === episodes[i].writers[j]) {
            // Increment this writer's count
            list[k].count++;
            break;
          }
        }
      }
    }
  }

  // Sort in descending order
  list.sort((a, b) => b.count - a.count);

  return list;
}

function getEpisodeDetails(season, episode) {
  return Series[season - 1].episodes[episode - 1];
}

function getPreviousEpisode({ season, episode }) {
  if (episode === 1) {
    if (season === 1)
      return getEpisodeDetails(
        Series.length,
        Series[Series.length - 1].episodes.length
      );
    else
      return getEpisodeDetails(season - 1, Series[season - 2].episodes.length);
  } else {
    return getEpisodeDetails(season, episode - 1);
  }
}

function getNextEpisode({ season, episode }) {
  if (episode === Series[season - 1].episodes.length) {
    if (season === Series.length) return getEpisodeDetails(1, 1);
    else return getEpisodeDetails(season + 1, 1);
  } else {
    return getEpisodeDetails(season, episode + 1);
  }
}

function getRandomEpisode(lead, writer, season) {
  const includes = episodes.filter(item => {
    return (
      (lead === "All" || item.lead.includes(lead)) &&
      (writer === "All" || item.writers.includes(writer)) &&
      (season === "All" || item.season === season)
    );
  });

  const choice = includes[Math.floor(Math.random() * includes.length)];

  return getEpisodeDetails(choice.season, choice.episode);
}

function getRandomEpisodeFromSeason(season) {
  const items = Series[season - 1].episodes;
  const choice = items[Math.floor(Math.random() * items.length)].episode;
  return getEpisodeDetails(season, choice);
}

//------------------------------------------------------------------------------
// Main component
export default class Main extends React.Component {
  constructor(props) {
    super(props);

    if (props.season) var season = Number(props.season);
    if (props.episode) var episode = Number(props.episode);

    // Select random episode to start
    this.state = {
      episode: getRandomEpisode("All", "All", "All")
    };

    if (season && episode) {
      // If a specific episode is given, set it now
      this.setState({
        episode: getEpisodeDetails(season, episode)
      });
    } else if (season) {
      // Select random episode from season
      this.setState({
        episode: getRandomEpisodeFromSeason(season)
      });
    }

    // Bind control methods
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);
    this.handleSearchSelection = this.handleSearchSelection.bind(this);
  }

  handlePreviousClick() {
    this.setState({ episode: getPreviousEpisode(this.state.episode) });
  }

  handleNextClick() {
    this.setState({ episode: getNextEpisode(this.state.episode) });
  }

  handleApplyClick(filters) {
    console.log(filters);
    this.setState({
      episode: getRandomEpisode(filters.lead, filters.writer, filters.season)
    });
  }

  handleSearchSelection(episode) {
    this.setState({ episode: episode });
  }

  render() {
    return (
      <div className="main">
        <Controls
          onPreviousClick={this.handlePreviousClick}
          onNextClick={this.handleNextClick}
          onApplyClick={this.handleApplyClick}
          writers={this.writers}
          getWriters={getWriters}
        />
        <Episode episode={this.state.episode} />
        <Search episodes={episodes} onSelect={this.handleSearchSelection} />
      </div>
    );
  }
}
