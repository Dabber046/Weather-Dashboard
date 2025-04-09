import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

interface Coordinates {
  lat: number;
  lon: number;
}

interface Weather {
  date: string;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

class WeatherService {
  private readonly apiKey = process.env.OPENWEATHER_API_KEY;
  private readonly geoBaseUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  private readonly weatherBaseUrl = 'https://api.openweathermap.org/data/2.5';

  private async fetchLocationData(city: string): Promise<Coordinates> {
    const res = await axios.get(this.geoBaseUrl, {
      params: {
        q: city,
        limit: 1,
        appid: this.apiKey,
      },
    });

    const [location] = res.data;
    if (!location) throw new Error('City not found');

    return { lat: location.lat, lon: location.lon };
  }

  private async fetchWeatherData(coords: Coordinates): Promise<any> {
    const res = await axios.get(`${this.weatherBaseUrl}/forecast`, {
      params: {
        lat: coords.lat,
        lon: coords.lon,
        units: 'metric',
        appid: this.apiKey,
      },
    });

    return res.data;
  }

  private parseCurrentWeather(data: any): Weather {
    const current = data.list[0];
    return {
      date: new Date(current.dt * 1000).toLocaleDateString(),
      icon: current.weather[0].icon,
      description: current.weather[0].description,
      temperature: current.main.temp,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
    };
  }

  private buildForecastArray(data: any): Weather[] {
    const dailyForecast: { [key: string]: Weather } = {};

    for (let entry of data.list) {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date,
          icon: entry.weather[0].icon,
          description: entry.weather[0].description,
          temperature: entry.main.temp,
          humidity: entry.main.humidity,
          windSpeed: entry.wind.speed,
        };
      }
    }

    return Object.values(dailyForecast).slice(0, 5);
  }

  public async getWeatherForCity(city: string): Promise<{ current: Weather; forecast: Weather[] }> {
    const coords = await this.fetchLocationData(city);
    const data = await this.fetchWeatherData(coords);
    const current = this.parseCurrentWeather(data);
    const forecast = this.buildForecastArray(data);

    return { current, forecast };
  }
}

export default new WeatherService();
