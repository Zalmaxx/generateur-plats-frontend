import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = environment.apiUrl + "/api";
  constructor(private http:HttpClient) { }

  fonction(): Observable<string | null> {
    return this.http.get<string>(`${this.url}/version`, {observe: "response"}).pipe(
      map((value:HttpResponse<string>)=> {
        return value.body
      })
    )
  }

  getImage(parametre?: string): Observable<any> {
    let params: HttpParams = new HttpParams()
    if (parametre) {
      params = params.append("parametre", parametre)
    }
    return this.http.get<string>(`${this.url}/image`, {params, observe: "response"}).pipe(
      map((value: HttpResponse<string>) => {
        return value
      }), catchError((error: HttpErrorResponse) => {
        console.error("Erreur HTTP avec le code de statut:", error.status)
        return throwError(error)
      })
    )

  }
}
