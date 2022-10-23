import React from 'react';
import { toQueryString } from '../utils';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.pollWeather, this.errHandle);
    console.log('componentDidMount');
  }

  errHandle = (err) => {
    console.log('Geolocation is not supported by this device. Please turn on geolocation in order to use this feature');
  }

  pollWeather = (location) => {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
   
    /* Remember that it's unsafe to expose your API key! In production,
    you would definitely save your key in an environment variable.
    To keep API keys simple during the development of your project,
    you can set an `apiKey` variable in this file for now. */
   // const apiKey = `???`
   const apiKey = `f623a24c569aa6dd29c569707946857a`;


    const params = {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
      appid: apiKey
    };
    
    url += toQueryString(params);

    fetch(url)
      .then((res) => res.json())
      .then((weather) => { console.log('weather json', weather);
        this.setState({ weather })
      });
  }

  render() {
    const weather = this.state.weather;
    let content = <div className='loading'>loading weather...Geolocation is not supported by this device. Please turn on geolocation in order to use this feature</div>;
    
    if (weather && weather.main) {
      const temp = (weather.main.temp - 273.15) * 1.8 + 32;
      content = <div> 
        <p>{weather.name}</p>
        <p>{temp.toFixed(1)} degrees</p>
      </div>;
    }

    return (
      <section>
        <h1>Weather</h1>
        <div className='weather'>
          {content}
        </div>
      </section>
    );
  }
}

export default Weather;
