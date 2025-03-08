import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';  // Ensure correct path

@Component({
    selector: 'app-weather',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
    city: string = '';
    weatherData: any = null;
    errorMessage: string = '';

    constructor(private weatherService: WeatherService) {}

    getWeather(): void {
        if (this.city) {
            this.weatherService.getWeather(this.city).subscribe(
                (data) => {
                    this.weatherData = data;
                    this.errorMessage = '';
                },
                () => {
                    this.errorMessage = 'City not found. Please try again.';
                    this.weatherData = null;
                }
            );
        } else {
            this.errorMessage = 'Please enter a city name.';
            this.weatherData = null;
        }
    }
}