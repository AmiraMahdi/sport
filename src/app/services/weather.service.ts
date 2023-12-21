import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherUrl: string = "http://localhost:3000/weather";
  constructor(private httpClient: HttpClient) { }
  search(obj: any) {
    return this.httpClient.post<{ city: any, weatherData: any }>(this.weatherUrl, obj);
  }
}
