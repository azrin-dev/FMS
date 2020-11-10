import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataServicesService } from '../services/data-services/data-services.service';

interface YouTubeApi {
   player: { embedHtml: HTMLVideoElement };
 };

@Component({
  selector: 'app-content-right',
  templateUrl: './content-right.component.html',
  styleUrls: ['./content-right.component.scss']
})
export class ContentRightComponent implements OnInit {

   video: HTMLVideoElement = null;

  constructor(
     private dataService: DataServicesService,
     private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): any{   
      this.subscribeVideo();
  }

   subscribeVideo(){
      // this.dataService.mediaCode.subscribe(
      //    (response: YouTubeApi) => {              
      //       if(response){
      //          this.video = response.player.embedHtml; 
      //       }
      //       else this.video = null;
      //    }
      // )
   }                   
           

}
