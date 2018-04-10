ahimport React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col, Button, Form, FormGroup, ButtonGroup, Label, Input, FormText, Container, InputGroupText, InputGroup, InputGroupAddon, DropdownMenu, DropdownToggle, DropdownItem, Dropdown } from 'reactstrap';
import CitySuggestion from './CitySuggestion.js'

const home = {
  description: "Krivá, Slovensko",
  place_id: "ChIJw-l53V65FUcRwAmXxtH3AAQ"
}

const dolnyKubin = {
  description: "Dolný Kubín, Slovensko",
  place_id: "ChIJb8GpMKSxFUcRwAiXxtH3AAQ"
}

const trstena = {
  description: "Trstená, Slovensko",
  place_id: "ChIJL_qT8e7GFUcRwAuXxtH3AAQ"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.onFromSelected = this.onFromSelected.bind(this)
    this.onToSelected = this.onToSelected.bind(this)
    this.calculateDistance = this.calculateDistance.bind(this)
    this.getMinimalDistance = this.getMinimalDistance.bind(this)
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      message: null,
      from: home,
      to: null,
      distance: 0.0,
      distanceMultiply: 2,
      drivers: ["Pavol", "Peter", "Jozef", "Filip"],
      commonDestinations: ["Dolny Kubin", "Trstena"]
    };
  }

  onFromSelected(city) {
    this.setState({
      from: city
    }, function () { this.calculateDistance() })
  }

  onToSelected(city) {
    this.setState({
      to: city
    }, function () { this.calculateDistance() })
  }

  calculateDistance() {
    if (this.state.from != null && this.state.to != null) {
      this.getMinimalDistance(this.state.from.place_id, this.state.to.place_id)
    }
  }

  getMinimalDistance(from, to) {
    Promise.all([this.getDistance(from, to), this.getDistance(to, from)])
      .then(([first, second]) => {
        const minD = Math.min(first.rows["0"].elements["0"].distance.value, second.rows["0"].elements["0"].distance.value) / 1000;
        this.setState({
          distance: minD
        })
      })
  }

  getDistance(from, to) {
    return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=place_id:' +
      from + "&destinations=place_id:" + to + '&key=AIzaSyCI_rLScZv895aG1iJa9adiAGIZYXUzWps')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      }).then(json => {
        return json// json.rows["0"].elements["0"].distance.value / 1000
      })
  }
  onRadioBtnClick(distanceMultiply) {
    this.setState({ distanceMultiply });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col lg="6">
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect">
                  {this.state.drivers.map((item) => <option>{item}</option>)}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <CitySuggestion placeholder="Krivá"
                value={this.state.from.description}
                onSelected={this.onFromSelected}
              />
            </Col>
          </Row>

          <Row>
            <Col lg="6">
              <CitySuggestion placeholder="Kam"
                onSelected={this.onToSelected}
              />
            </Col>
          </Row>

          <FormGroup>
            <Row>
              <InputGroup>
                <Col lg="6" xs="8">
                  <Input placeholder="0" type="number" value={Math.round(this.state.distance * this.state.distanceMultiply)} />
                </Col>
                <Col lg="4" xs="1">
                  <ButtonGroup>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.distanceMultiply === 1}>x1</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.distanceMultiply === 2}>x2</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.distanceMultiply === 4}>x4</Button>
                  </ButtonGroup>
                </Col>
              </InputGroup>
            </Row>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <Input placeholder="Cena" type="number" value={Math.round(this.state.distance * 0.059 * this.state.distanceMultiply)} />
              <InputGroupAddon addonType="prepend">€</InputGroupAddon>
            </InputGroup>
          </FormGroup>

        </Container>

      </div>
    );
  }
}

export default App;
