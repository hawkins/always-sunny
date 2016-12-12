import React, { Component } from 'react';

import Episode from './Episode.js';
import Controls from './Controls.js';
import Search from './Search.js';

// Data
import EpisodeDetails from '../Data/EpisodeDetails.js';
import Sunny from '../Data/Sunny.js';

//------------------------------------------------------------------------------
// Helper functions to manage data
function getWriters (lead) {
  var list = [{value: 'All', count: 0}];

  for (var i = 0; i < EpisodeDetails.length; i++) {

    // Only consider episodes with our lead character prominent
    if (lead === 'All' || EpisodeDetails[i].lead.includes(lead)) {

      // Increment 'All' count
      list[0].count++;

      for (var j = 0; j < EpisodeDetails[i].writers.length; j++) {

        // Find writer in list and increment count
        for (var k = 0; k <= list.length; k++) {
          if (!list[k]) {
            // Add this writer to list
            list.push({value: EpisodeDetails[i].writers[j], count: 1});
            break;
          }

          if (list[k].value === EpisodeDetails[i].writers[j]) {
            // Increment this writer's count
            list[k].count++;
            break;
          }
        }
      }
    }
  }

  // Sort in descending order
  list.sort(function(a, b) {
    return b.count - a.count;
  });

  return list;
}

function getAllEpisodes () {
  var episodes = [];
  for (var i = 0; i < EpisodeDetails.length; i++) {
    try {
      episodes.push(getEpisodeDetails(EpisodeDetails[i].season, EpisodeDetails[i].episode));
    } catch(err) {
      console.warn('Need to fix #4');
      console.warn(err);
    }
  }
  return episodes;
}

function getEpisodeDetails (s, ep) {
  var details = {};
  for (var i = 0; i < EpisodeDetails.length; i++) {
    if (s === EpisodeDetails[i].season && ep === EpisodeDetails[i].episode) {
      details = EpisodeDetails[i];
    }
  }

  // Attach info from Sunny
  const SunnyInfo = Sunny.video.seasons[s - 1].episodes[ep - 1];
  details.title = SunnyInfo.title;
  details.description = SunnyInfo.synopsis;
  details.link = 'https://www.netflix.com/watch/' + SunnyInfo.episodeId;
  return details;
}

function getPreviousEpisode (episode) {
  var s = episode.season;
  var e = episode.episode;
  // If first episode in this season
  if (e === 1) {
    // If first season
    if (s === 1)
      return getEpisodeDetails(Sunny.video.seasons.length, Sunny.video.seasons[Sunny.video.seasons.length - 1].episodes.length);
    else
      return getEpisodeDetails(s - 1, Sunny.video.seasons[s - 2].episodes.length);
  } else {
    return getEpisodeDetails(s, e - 1);
  }
}

function getNextEpisode (episode) {
  var s = episode.season;
  var e = episode.episode;
  // If last episode in this season
  if (e === Sunny.video.seasons[s - 1].episodes.length) {
    // If last season
    if (s === Sunny.video.seasons.length)
      return getEpisodeDetails(1, 1);
    else
      return getEpisodeDetails(s + 1, 1);
  } else {
    return getEpisodeDetails(s, e + 1);
  }
}

function getRandomEpisode (lead, writer) {
  var includes = EpisodeDetails.filter((item) => {
    return (lead === 'All' || item.lead.includes(lead)) && (writer === 'All' || item.writers.includes(writer))
  })

  var item = includes[Math.floor(Math.random() * includes.length)];

  return getEpisodeDetails(item.season, item.episode);
}

//------------------------------------------------------------------------------
// Main component
class Main extends Component {
  constructor() {
    super();
    // Select random episode to start
    this.state = {
      "episode": getRandomEpisode('All', 'All')
    };

    // Collect show information
    this.episodes = getAllEpisodes();

    // Bind control methods
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleApplyClick = this.handleApplyClick.bind(this);
    this.handleSearchSelection = this.handleSearchSelection.bind(this);
  }

  handlePreviousClick() {
    this.setState({"episode": getPreviousEpisode(this.state.episode)});
  }

  handleNextClick() {
    this.setState({"episode": getNextEpisode(this.state.episode)});
  }

  handleApplyClick(filters) {
    this.setState({"episode": getRandomEpisode(filters.lead, filters.writer)});
  }

  handleSearchSelection(episode) {
    this.setState({"episode": episode});
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
        <Episode
          episode={this.state.episode}
        />
        <Search
          episodes={this.episodes}
          onSelect={this.handleSearchSelection}
        />
      </div>
    );
  }
}

export default Main;
