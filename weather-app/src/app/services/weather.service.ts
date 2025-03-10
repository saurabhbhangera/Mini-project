import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiKey = 'fe5da788f7be0946b0f21a19089eee20'; // Replace with your actual API key
    private apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`;

    constructor(private http: HttpClient) {}

    getWeather(city: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${city}`);
    }
}