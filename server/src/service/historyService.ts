import { readFile, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private dbPath = path.join(__dirname, '../../db/db.json');

  private async read(): Promise<City[]> {
    try {
      const data = await readFile(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await writeFile(this.dbPath, JSON.stringify(cities, null, 2));
  }

  public async getHistory(): Promise<City[]> {
    return await this.read();
  }

  public async addCity(name: string): Promise<City> {
    const cities = await this.read();
    const existing = cities.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing;

    const newCity: City = {
      id: uuidv4(),
      name,
    };

    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  public async deleteCity(id: string): Promise<City[]> {
    let cities = await this.read();
    cities = cities.filter((city) => city.id !== id);
    await this.write(cities);
    return cities;
  }
}

export default new HistoryService();
