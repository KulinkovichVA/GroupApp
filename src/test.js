// import { students } from './data/Students';

students = require('./data/Students');

function getCities() {
    let cities = [];
    students.forEach((person) => {
        cities.push(person.living);
    });
    return cities;
}

console.log(students);
