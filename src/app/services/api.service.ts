import { Injectable } from '@angular/core';
import {map} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8069/version"
  constructor(private http:HttpClient) { }

  fonction() {
    return this.http.get<string>(this.url, {observe: "response"}).pipe(
      map((value:HttpResponse<string>)=> {
        return value.body
      })
    )
  }
}
