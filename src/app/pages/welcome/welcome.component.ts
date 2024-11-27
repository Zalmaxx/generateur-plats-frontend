import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  version:string | null = null

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.apiService.fonction().subscribe({
      next: (value: any) => {
        this.version = value.version
      }
    })
  }
}
