import React from "react";
import { Button } from "react-toolbox/lib/button";

function commaSeparatedItems(item, index) {
  if (index === 0) {
    return <span key={item}>{item}</span>;
  } else {
    return <span key={item}>, {item}</span>;
  }
}

export default ({ episode }) => (
  <div className="episode">
    <label>Watch</label>
    <h3>{episode.title}</h3>
    <h5 className="dark">
      Season: {episode.season} Episode: {episode.episode}
    </h5>
    <p className="description">{episode.description}</p>
    <p>
      <b>Lead characters: </b>
      <span className="dark">{episode.lead.map(commaSeparatedItems)}</span>
    </p>
    {episode.guest ? (
      <p>
        <b>Guest characters: </b>
        <span className="dark">{episode.guest.map(commaSeparatedItems)}</span>
      </p>
    ) : null}
    <p>
      <b>Written by: </b>
      <span className="dark">{episode.writers.map(commaSeparatedItems)}</span>
    </p>
    <Button
      raised
      primary
      target="_blank"
      href={episode.link}
      style={{ marginBottom: 20, fontSize: "1.4rem" }}
    >
      Watch now on Hulu
    </Button>
  </div>
);
