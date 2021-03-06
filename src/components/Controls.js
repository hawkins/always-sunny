import React, { Component } from "react";
import { Button } from "react-toolbox/lib/button";
import Dropdown from "react-toolbox/lib/dropdown";
import episodes from "../data/episodes";

//------------------------------------------------------------------------------
// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column"
};

const contentStyle = {
  fontSize: "1.4rem",
  display: "flex",
  flexDirection: "column",
  flexGrow: 2
};

//------------------------------------------------------------------------------
// Helper functions
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

//------------------------------------------------------------------------------
// Component
export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lead: "All",
      writer: "All",
      season: "All",
      suggestions: [],
      search: ""
    };

    this.writers = [];

    // Needs .value property because of Dropdown
    this.characters = [
      { value: "All" },
      { value: "Charlie" },
      { value: "Dee" },
      { value: "Dennis" },
      { value: "Frank" },
      { value: "Mac" }
    ];

    // [{ value: 'All'}, { value: 1 }, ..., { value: 12 }]
    this.seasons = [
      "All",
      ...Array.from(new Set(episodes.map(a => a.season)).values()).sort(
        (a, b) => a - b
      )
    ].map(a => ({ value: a }));

    this.updateWriters = this.updateWriters.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onLeadChange = this.onLeadChange.bind(this);
    this.onWriterChange = this.onWriterChange.bind(this);
    this.onSeasonChange = this.onSeasonChange.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);

    // Go ahead and get writers to start
    this.updateWriters(this.state.lead, this.state.season);
  }

  updateWriters(lead, season) {
    this.writers = getWriters(lead, season);
  }

  renderLead(item) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle} className="item">
          <strong>{item.value}</strong>
        </div>
      </div>
    );
  }

  renderWriter(item) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle} className="item">
          <strong>{item.value}</strong>
          <small>{item.count} episodes</small>
        </div>
      </div>
    );
  }

  renderSeason(item) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle} className="item">
          <strong>{item.value}</strong>
        </div>
      </div>
    );
  }

  onPreviousClick() {
    this.props.onPreviousClick();
  }

  onNextClick() {
    this.props.onNextClick();
  }

  onApplyClick() {
    this.props.onApplyClick({
      lead: this.state.lead,
      writer: this.state.writer,
      season: this.state.season
    });
  }

  onLeadChange(value) {
    this.updateWriters(value, this.state.season);
    this.setState({ lead: value });
  }

  onWriterChange(value) {
    this.setState({ writer: value });
  }

  onSeasonChange(value) {
    this.updateWriters(this.state.lead, value);
    this.setState({ season: value });
  }

  render() {
    return (
      <div className="controls">
        <label>Filter</label>
        <br />
        <label>Filter by lead character</label>
        <Dropdown
          auto
          onChange={this.onLeadChange}
          source={this.characters}
          value={this.state.lead}
          template={this.renderLead}
        />

        <label>Filter by writer</label>
        <Dropdown
          auto
          onChange={this.onWriterChange}
          source={this.writers}
          value={this.state.writer}
          template={this.renderWriter}
        />

        <label>Filter by season</label>
        <Dropdown
          auto
          onChange={this.onSeasonChange}
          source={this.seasons}
          value={this.state.season}
          template={this.renderSeason}
        />

        <Button raised primary ripple onClick={this.onApplyClick}>
          Apply filters
        </Button>
        <br />
        <Button flat primary ripple onClick={this.onPreviousClick}>
          Previous episode
        </Button>
        <br />
        <Button flat primary ripple onClick={this.onNextClick}>
          Next episode
        </Button>
      </div>
    );
  }
}
