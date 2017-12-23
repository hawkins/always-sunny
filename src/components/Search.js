import React from "react";
import Autosuggest from "react-autosuggest";

function commaSeparatedItems(item, index) {
  if (index === 0) {
    return <span key={item}>{item}</span>;
  } else {
    return <span key={item}>, {item}</span>;
  }
}

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
// Autosuggest functions
const renderSuggestion = suggestion => {
  return (
    <div style={containerStyle}>
      <div style={contentStyle} className="item">
        <strong>{suggestion.title}</strong>
        <span>
          S{suggestion.season}:E{suggestion.episode}
        </span>
        <span>Lead: {suggestion.lead.map(commaSeparatedItems)}</span>
      </div>
      <br />
    </div>
  );
};
const shouldRenderSuggestions = value => value.trim().length > 2;
const getSuggestionValue = suggestion => suggestion;

//------------------------------------------------------------------------------
// Component
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      search: ""
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.props.episodes.filter(
          episode =>
            episode.title.toLowerCase().indexOf(inputValue) !== -1 ||
            episode.description.toLowerCase().indexOf(inputValue) !== -1 ||
            (episode.guest &&
              episode.guest
                .join(",")
                .toLowerCase()
                .indexOf(inputValue) !== -1)
        );
  }

  onSearchChange(event, { newValue }) {
    this.setState({
      search: newValue
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  onSuggestionSelected(
    event,
    { suggestion, suggestionValue, sectionIndex, method }
  ) {
    this.setState({
      episode: suggestion,
      search: ""
    });

    // Now set it globally
    this.props.onSelect(suggestion);
  }

  render() {
    return (
      <div className="search">
        <label>Search</label>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          shouldRenderSuggestions={shouldRenderSuggestions}
          inputProps={{
            autoFocus: true,
            placeholder: "Start typing",
            value: this.state.search,
            onChange: this.onSearchChange
          }}
        />
      </div>
    );
  }
}

export default Search;
