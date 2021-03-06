import React, { PropTypes } from "react";
import { withRouter } from "react-router-dom";
import Episode from "./Episode";
import Controls from "./Controls";
import Search from "./Search";
import Series from "../data/series";
import episodes from "../data/episodes";

//------------------------------------------------------------------------------
// Helper functions to manage data
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
class Main extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    // Select random episode to start
    this.state = getRandomEpisode("All", "All", "All");

    if (props.season && props.episode) {
      // If a specific episode is given, set it now
      this.state = getEpisodeDetails(
        Number(props.season),
        Number(props.episode)
      );
    } else if (props.season) {
      // Select random episode from season
      this.state = getRandomEpisodeFromSeason(Number(props.season));
    } else {
      this.state = getRandomEpisode("All", "All", "All");
    }

    // Bind control methods
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);
    this.handleSearchSelection = this.handleSearchSelection.bind(this);
    this.updateURL = this.updateURL.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.season === undefined) return;

    const { episode, season } = this.state;

    // Only update the history if user originally specified season and or episode
    if (prevProps.episode !== episode || prevProps.season !== season) {
      this.updateURL();
    }
  }

  updateURL() {
    const { episode, history } = this.props;

    if (episode !== undefined) {
      history.push(`/${this.state.season}/${this.state.episode}`);
    } else {
      history.push(`/${this.state.season}`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.episode !== this.state.episode ||
      nextState.season !== this.state.season
    );
  }

  handlePreviousClick() {
    this.setState(getPreviousEpisode(this.state));
  }

  handleNextClick() {
    this.setState(getNextEpisode(this.state));
  }

  handleApplyClick(filters) {
    this.setState(
      getRandomEpisode(filters.lead, filters.writer, filters.season)
    );
  }

  handleSearchSelection(episode) {
    this.setState(episode);
  }

  render() {
    return (
      <div className="main">
        <Controls
          onPreviousClick={this.handlePreviousClick}
          onNextClick={this.handleNextClick}
          onApplyClick={this.handleApplyClick}
        />
        <Episode episode={this.state} />
        <Search episodes={episodes} onSelect={this.handleSearchSelection} />
      </div>
    );
  }
}

export default withRouter(Main);
