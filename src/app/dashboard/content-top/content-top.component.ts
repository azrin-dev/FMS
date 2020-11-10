import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YouTube } from '../interface/youtube'
import { DataServicesService } from '../services/data-services/data-services.service';

@Component({
  selector: 'app-content-top',
  templateUrl: './content-top.component.html',
  styleUrls: ['./content-top.component.scss']
})
export class ContentTopComponent implements OnInit {

   youtubeFeeds: YouTube['datas'];
    youtubeDate: YouTube['date'];

  constructor(
     private dataService: DataServicesService,
     private snackBar: MatSnackBar
  ) { }

  ngOnInit()
  { 
     this.refreshFeeds(true);
  }

  refreshFeeds(event)
   {  if(event) {      
         this.dataService.youtubeFeeds().subscribe(
            (response: YouTube) =>  {             
               console.log(response);                 
               if(response){
                  this.youtubeFeeds = response.datas;
                  this.youtubeDate = response.date;
               }
            },
            (error => {
               console.log(error);
               this.snackBar.open(error, 'X', { duration: 10000, panelClass: 'panelAccent' })
            })
         )
      }
  }

  mediaPlayer(feed){
     if(feed){
         this.dataService.playMedia(feed);
      }     
  }

}