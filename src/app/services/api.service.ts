import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.apiUrl + "/api";
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
