import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
    return this.http.get<any>(url)
      .pipe(
        retry(2), //retry the call 3 times
        catchError(this.handleError) // then handle the error
      )
  }

  //Get icon
  getIcon(icon:string){
    const url = `${this.iconUrl}${icon}.png`
    return this.http.get<any>(url)
  }

  //Handle request if error occured
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
