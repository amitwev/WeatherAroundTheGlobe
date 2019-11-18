import { Component, OnInit } from '@angular/core';

import { City } from '../../../models/City';
import { Weather } from '../../../models/Weather'
import { WeatherService } from '../../../services/weather.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  cities:City[];
  selectedCity:number;
  forecast:Weather[]; 
  today:Weather;
  isDataLoaded:boolean;
  isLoading:boolean;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    this.forecast = [];
    this.isDataLoaded = false;
    //set the cities array
    this.cities = [
      {
        id: 293397,
        name: "Tel Aviv",
        country: "IL",
      }, 
      {
        id: 281184,
        name: "Jerusalem",
        country: "IL",
      }, 
      {
        id: 1819729,
        name: "Hong Kong",
        country: "HK",
      },
      {
        id: 5368361,
        name: "Los Angeles",
        country: "US",
      },
      {
        id: 4164138,
        name: "Miami",
        country: "US",
      },
      {
        id: 1694008,
        name: "Republic of the Philippines",
        country: "PH",
      },
      {
        id: 6425698,
        name: "Villefranche-sur-Mer",
        country: "FR",
      },
      {
        id: 3176952,
        name: "Firenzuola",
        country: "IT",
      },
    ]
  }
  //When user select country
  onSelected(){
    //Set lodin component to show 
    this.isLoading = true;
    //If this is not the first time when user pick country, init the param
    this.ngOnInit();
    //Call service to get the weather with city id  
    this.weatherService.getWeather(this.selectedCity).subscribe(results => {
      let firstIteration = true; 
      let currentDay = results.list[0].dt_txt.substring(8,10);
      for(let result of results.list){
        let temp = new Weather;
        temp = {
          date:result.dt_txt.substring(0,10),
          minTemp:result.main.temp_min,
          maxTemp:result.main.temp_max,
          main: result.weather[0].main,
          description: result.weather[0].description,
          icon: result.weather[0].icon,
          city: results.city.name,
          timestamp: result.dt
        };
        //first iteration insert to today param
        if(firstIteration){
          firstIteration = false; 
          this.today = temp;
          currentDay = result.dt_txt.substring(8,10);
          //insert the rest to forecast
        }else if(result.dt_txt.substring(8,10) !== currentDay){
          this.forecast.push(temp);
          currentDay = result.dt_txt.substring(8,10);
        }
      }
      this.isDataLoaded = true;
      this.isLoading = false;
    });
  }
}
