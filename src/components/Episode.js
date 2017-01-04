import React, { Component } from 'react';

import { Button } from 'react-toolbox/lib/button';

function commaSeparatedItems (item, index) {
  if (index === 0) {
    return (
      <span key={item}>{item}</span>
    );
  } else {
    return (
      <span key={item}>, {item}</span>
    );
  }
}

class Episode extends Component {
  render() {
    return (
      <div className="episode">
        <label>Watch</label>
        <h3>{this.props.episode.title}</h3>
        <h5 className="dark">Season: {this.props.episode.season} Episode: {this.props.episode.episode}</h5>

        <p className="description">{this.props.episode.description}</p>

        <p><b>Lead characters: </b><span className="dark">{this.props.episode.lead.map(commaSeparatedItems)}</span></p>
        {this.props.episode.guest ? <p><b>Guest characters: </b> <span className="dark">{this.props.episode.guest.map(commaSeparatedItems)}</span></p> : undefined}
        <p><b>Written by: </b><span className="dark">{this.props.episode.writers.map(commaSeparatedItems)}</span></p>

        <Button
          raised
          primary
          target="_blank"
          href={this.props.episode.link}
          style={{marginBottom: 20, fontSize: '1.4rem'}}>
          Watch Now on Netflix
        </Button>
      </div>
    );
  }
}

export default Episode;
