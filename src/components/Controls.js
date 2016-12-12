import React, { Component } from 'react';

import { Button } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';

//------------------------------------------------------------------------------
// Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const contentStyle = {
  fontSize: '1.4rem',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 2
};

//------------------------------------------------------------------------------
// Component
class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'lead': 'All',
      'writer': 'All',
      'suggestions': [],
      'search': ''
    };

    this.writers = [];

    // Needs .value property because of Dropdown
    this.characters = [
      {value: 'All'},
      {value: 'Charlie'},
      {value: 'Dee'},
      {value: 'Dennis'},
      {value: 'Frank'},
      {value: 'Mac'}
    ];

    this.updateWriters = this.updateWriters.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onLeadChange = this.onLeadChange.bind(this);
    this.onWriterChange = this.onWriterChange.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);

    // Go ahead and get writers to start
    this.updateWriters(this.state.lead);
  }

  updateWriters (lead) {
    this.writers = this.props.getWriters(lead);
  }

  renderLead (item) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle} className="item">
          <strong>{item.value}</strong>
        </div>
      </div>
    );
  }

  renderWriter (item) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle} className="item">
          <strong>{item.value}</strong>
          <small>{item.count} episodes</small>
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
    this.props.onApplyClick({'lead': this.state.lead, 'writer': this.state.writer});
  }

  onLeadChange(value) {
    this.updateWriters(value);
    this.setState({
      'lead': value
    });
  }

  onWriterChange(value) {
    this.setState({
      'writer': value
    });
  }

  render() {
    return (
      <div className="controls">
        <label>Filter</label>
        <br/>
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

        <Button raised primary ripple onClick={this.onApplyClick}>Apply filters</Button>
        <br/>
        <Button flat primary ripple onClick={this.onPreviousClick}>Previous episode</Button>
        <br/>
        <Button flat primary ripple onClick={this.onNextClick}>Next episode</Button>
      </div>
    );
  }
}

export default Controls;
