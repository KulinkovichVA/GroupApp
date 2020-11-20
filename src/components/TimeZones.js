import React from 'react';
import moment from 'moment-timezone';

function TimeZones({ cities, weather, time }) {
    return (
        <div>
            <div className="TimeZonesContainer">
                {cities.map((city, i) => {
                    return (
                        <div key={city} className="TimeZone">
                            <div className="CityName">{city}</div>
                            {weather && time && (
                                <div className="CityInfo">
                                    <img
                                        className="WeatherIcon"
                                        src={weather[city].icon}
                                        alt="icon"
                                    />
                                    <div className="TempInfo">
                                        {weather[city].temp + '°'}
                                    </div>
                                    <div>
                                        {time
                                            .tz(weather[city].timeZone)
                                            .format('HH:mm:ss')}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TimeZones;
