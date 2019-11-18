import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  weatherUrl:string = 'http://api.openweathermap.org/data/2.5/forecast?id=CITYID&appid=';
  iconUrl:string = 'http://openweathermap.org/img/wn/'
  //Get weather per selected city
  getWeather(city:number){ 
    const url = `${this.weatherUrl.replace("CITYID", String(city))}${environment.apikey}&units=metric`; 
    return this.http.get<any>(url);
  }
  //Get icon
  getIcon(icon:string){
    const url = `${this.iconUrl}${icon}.png`
    return this.http.get<any>(url);
  }

}
