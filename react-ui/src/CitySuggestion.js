import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';
import store from './index.js'
class CitySuggestion extends Component {
  constructor(props) {
    super(props);
    this.majklik = this.onListItemClicked.bind(this)
    this.state = {
      suggestions: [],
      suggestionVisible: false,
      selectedName: "",
      selectedItem: null
    };
  }

  getPlaceSuggetion(findCity) {
    return fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + findCity + '&key=AIzaSyCI_rLScZv895aG1iJa9adiAGIZYXUzWps&language=sk')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      }).then(json => {
        this.setState({
          suggestions: json.predictions,
          suggestionVisible: json.predictions.length > 0
        })
      })

  }

  onInputChanged(e) {
    this.getPlaceSuggetion(e)
    this.setState({
      suggestionVisible: this.state.suggestions.length > 0,
      selectedName: e
    })
  }

  onListItemClicked(selected) {
    this.setState({
      selectedName: selected.description,
      selectedItem: selected,
      suggestionVisible: false
    })
    this.props.onSelected(selected)
  }

  render() {
    return (
      <FormGroup>
        <Input type="search" placeholder={this.props.placeholder} onChange={(e) => this.onInputChanged(e.target.value)} value={this.state.selectedName} />
        {this.state.suggestionVisible ? (
          <ListGroup >
            {this.state.suggestions.map((item) =>
              <ListGroupItem key={item.description} action onClick={(e) => this.onListItemClicked(item)} >{item.description}</ListGroupItem>
            )}
          </ListGroup>) : null}
      </FormGroup>
    );
  }
}

export default CitySuggestion;
