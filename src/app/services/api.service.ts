import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8080/version"
  constructor(private http:HttpClient) { }

  fonction(): Observable<string | null> {
    return this.http.get<string>(this.url, {observe: "response"}).pipe(
      map((value:HttpResponse<string>)=> {
        console.log(value.body)
        return value.body
      })
    )
  }
}
