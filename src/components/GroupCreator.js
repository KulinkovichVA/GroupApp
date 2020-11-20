import React from 'react';
import { students } from '../data/Students';

function getPeople() {
    return students.map((person) => person.name);
}

let people = getPeople();

let createGroups = (array, number) => {
    let index;
    let res = [];
    let group = [];
    console.log(array);
    while (array.length > 0) {
        group = [];
        for (let i = 0; i < number && array.length > 0; i++) {
            index = Math.floor(array.length * Math.random());
            group.push(array[index]);
            array.splice(index, 1);
        }
        res.push(group);
    }
    return res;
};

class GroupCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPerson: null,
            groups: null,
        };
    }

    loadClass = () => {
        people = getPeople();
    };

    getGroups = (number) => {
        this.setState({
            groups: createGroups([...people], number),
        });
    };

    deletePerson = (index) => {
        people.splice(index, 1);
    };

    addPerson = (event) => {
        event.preventDefault();
        people.push(event.target[0].value);
    };

    render() {
        return (
            <div>
                <div className="StudentsListContainer">
                    <form onSubmit={this.addPerson}>
                        <input
                            required
                            className="StudentInput"
                            placeholder="Add a student..."
                        ></input>
                        <input
                            type="submit"
                            // onClick={() => this.addPerson(name)}
                            className="AddBtn"
                            value="Add"
                        ></input>
                    </form>
                    <button onClick={this.loadClass} className="GroupBtn">
                        Load full class
                    </button>
                    <div className="StudentsList">
                        {people.map((person, i) => {
                            return (
                                <span
                                    onClick={() => this.deletePerson(i)}
                                    className="Person"
                                    key={person + i}
                                >
                                    {person}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <div className="GroupBtnContainer">
                    <button
                        className="GroupBtn"
                        onClick={() => this.getGroups(2)}
                    >
                        Create Pairs
                    </button>
                    <button
                        className="GroupBtn"
                        onClick={() => this.getGroups(3)}
                    >
                        Create groups of 3
                    </button>
                    <button
                        className="GroupBtn"
                        onClick={() => this.getGroups(4)}
                    >
                        Create groups of 4
                    </button>
                    <button
                        className="GroupBtn"
                        onClick={() => this.getGroups(5)}
                    >
                        Create groups of 5
                    </button>
                </div>
                <div className="GroupsContainer">
                    {this.state.groups &&
                        this.state.groups.map((group, i) => {
                            return (
                                <div key={i} className="Group">
                                    {group.join(' - ')}
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

export default GroupCreator;
