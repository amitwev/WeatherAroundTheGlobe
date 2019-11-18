import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Observable } from 'rxjs';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const days = ['Sun', 'Mon', 'The', 'Wed', 'Thu', 'Fri', 'Sat'];
const iconUrl = "http://openweathermap.org/img/wn/";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  @Input() date:string;
  @Input() minTemp:number; 
  @Input() maxTemp:number; 
  @Input() icon:any;
  @Input() main:string;
  @Input() timestamp:number;
  currentIcon:string;
  title:string;

  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    const date = new Date(this.date);
    this.minTemp = Number(this.minTemp.toFixed(0));
    this.maxTemp = Number(this.maxTemp.toFixed(0)) + 1;
    this.currentIcon = `${iconUrl}${this.icon}.png`;
    //Handle time stamp to date 
    this.title = date.toUTCString().substring(0,11); 
  }

  
}
