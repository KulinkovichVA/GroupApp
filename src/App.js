import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment-timezone';
import Home from './components/Home';
import TimeZones from './components/TimeZones';
import GroupCreator from './components/GroupCreator';
import FridayTalks from './components/FridayTalks';
import { students } from './data/Students';
import { citiesID } from './data/CitiesID';
import { weatherKey } from './data/Key';

function getCities() {
    let cities = [];
    students.forEach((person) => {
        if (!cities.includes(person.living)) {
            cities.push(person.living.replace(/ /g, ''));
        }
    });
    cities.push('Barcelona');
    return cities;
}

const cities = getCities();

function createRequest(city) {
    let request = 'https://api.weatherbit.io/v2.0/current?';
    request += 'city_id=' + citiesID[0][city];
    request += '&key=' + weatherKey;
    return request;
}

class App extends React.Component {
    intervalId = null;

    constructor(props) {
        super(props);
        this.state = {
            time: null,
            weather: null,
        };
        this.getWeather = this.getWeather.bind(this);
    }

    getWeather() {
        let currentWeather = {};
        let requests = [];
        cities.forEach((city) => {
            requests.push(axios.get(createRequest(city)));
        });
        axios.all(requests).then(
            axios.spread((...responses) => {
                cities.forEach((city, i) => {
                    currentWeather[city] = {
                        temp: responses[i].data.data[0].temp,
                        icon:
                            'https://www.weatherbit.io/static/img/icons/' +
                            responses[i].data.data[0].weather.icon +
                            '.png',
                        timeZone: responses[i].data.data[0].timezone,
                    };
                });
                this.setState({ weather: currentWeather });
            })
        );
    }

    getTime = () => {
        this.setState({ time: moment() });
    };

    componentDidMount() {
        this.getWeather();
        this.getTime();
        this.intervalId = setInterval(this.getTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <nav className="NavContainer">
                            <ul className="NavList">
                                <li className="NavItem">
                                    <Link to="/time-zones">
                                        Show time zones
                                    </Link>
                                </li>
                                <li className="NavItem">
                                    <Link to="/group-creator">
                                        Group creator
                                    </Link>
                                </li>
                                <li className="NavItem">
                                    <Link to="/friday-talks">Friday talks</Link>
                                </li>
                            </ul>
                        </nav>
                        {/* <button onClick={this.getWeather}>Puk</button> */}
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route exact path="/time-zones">
                                <TimeZones
                                    cities={cities}
                                    weather={this.state.weather}
                                    time={this.state.time}
                                />
                            </Route>
                            <Route exact path="/group-creator">
                                <GroupCreator />
                            </Route>
                            <Route exact path="/friday-talks">
                                <FridayTalks />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
