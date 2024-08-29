import { Component, OnInit } from '@angular/core';
import { WeatherService } from './Services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: boolean;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
