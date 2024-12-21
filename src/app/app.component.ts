import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {CommunicationServiceService} from "./services/communication-service.service";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzTagComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  version: string = "Communication serveur non établie";

  constructor(private communicationService: CommunicationServiceService, private apiService: ApiService) {
  }

  easterEggs() {
    sessionStorage.setItem('easterEggs', 'true');
    this.communicationService.triggerAction()
  }

  ngOnInit() {
    this.apiService.fonction().subscribe((data: any) => {
      this.version = data.version;
    });
  }
}
