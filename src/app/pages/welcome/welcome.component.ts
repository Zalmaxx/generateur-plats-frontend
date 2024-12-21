import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {NzImageDirective, NzImageModule} from "ng-zorro-antd/image";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {CommunicationServiceService} from "../../services/communication-service.service";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {finalize} from "rxjs";

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    NzImageDirective,
    NzImageModule,
    NzSelectComponent,
    NzOptionComponent,
    FormsModule,
    NzButtonComponent,
    NgIf,
    NgStyle,
    NzSpinComponent,
    NgOptimizedImage
  ],
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  version:string | null = null
  image: string = ""
  imageHttp: string = ""
  messageErreur?: string
  choix: string = "aleatoire"
  easterEggs: boolean = false;
  easteregg: string = "assets/images/EasterEggs.png";
  isLoading: boolean = false;

  constructor(private apiService : ApiService, private communicationService: CommunicationServiceService) {
    this.communicationService.action$.subscribe(() => {
      this.checkEasterEggs()
    })
  }

  ngOnInit() {
    this.getVersion()
    this.getImage()
  }

  checkEasterEggs(){
    sessionStorage.getItem('easterEggs') === 'true' ? this.easterEggs = true : this.easterEggs = false;
  }

  getImage() {
    this.isLoading = true;
    this.messageErreur = undefined;
    const type = this.choix !== 'aleatoire' ? this.choix : undefined;
    this.apiService.getImage(type).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next: (response: any) => {
        console.log(response.body)
        this.image = response.body.image as string;
        this.imageHttp = `https://http.cat/images/${response.status}.jpg`;
      },
      error: (error: any) => {
        console.log(error.status);
        if (error.status === 404) {
          this.messageErreur = "Erreur 404 mon pote. Ton truc existe pas";
        } else
        if (error.status === 400) {
          this.messageErreur = "Erreur 400 mec. Ta foiré ta requête boloss";
        } else
        if (error.status === 418) {
          this.messageErreur = "Erreur 418 boufon. Genre ta réussis à Tea Pot";
        } else {
          this.messageErreur = `Erreur ${error.status} : J'ai pas gérer cette erreur bogoss`;

        }
        this.image = `https://http.cat/images/${error.status}.jpg`;
        this.imageHttp = this.image
        console.error("Erreur HTTP avec le code de statut:", error.status);
      }, complete: () => {
        this.isLoading = false
      }
    });
  }

  getVersion(){
    this.apiService.fonction().subscribe({
      next: (value: any) => {
        this.version = value.version
      }
    })
  }
}
