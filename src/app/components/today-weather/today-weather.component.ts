import { Component, OnInit, Input } from '@angular/core';
const iconUrl = "http://openweathermap.org/img/wn/";

@Component({
  selector: 'app-today-weather',
  templateUrl: './today-weather.component.html',
  styleUrls: ['./today-weather.component.css']
})
export class TodayWeatherComponent implements OnInit {
  @Input() date:string;
  @Input() minTemp:number; 
  @Input() maxTemp:number; 
  @Input() icon:string;
  @Input() main:string;
  @Input() city:string;
  currentIcon:string; 
  constructor() { }

  ngOnInit() {
    this.date = this.date.substring(0,10); 
    this.minTemp = Number(this.minTemp.toFixed(0));
    this.maxTemp = Number(this.maxTemp.toFixed(0)) + 1;
    //Url for icon in the card
    this.currentIcon = `${iconUrl}${this.icon}.png`;
  }

}
