import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  banner: string = "Weather";
  weather: any;
  searchedValue:any;
  constructor(private builder:FormBuilder,
    private weatherService:WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.builder.group({
      weatherSearch: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  weatherSearch(){
    this.weatherService.search(this.weatherForm.value).subscribe((data) => {
      this.searchedValue=data.city.weatherSearch;
      console.log("here response from BE",data);
      
      this.weather=data.weatherData;
    })
  }


}
