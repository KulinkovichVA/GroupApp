import React from 'react';
import company from '../assets/images/company.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <img src={company} alt="Home pic" />
            </div>
        );
    }
}

export default Home;
