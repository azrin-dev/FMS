import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

   video: any = {};
   selectedMenu = {};

   media = new BehaviorSubject(this.video);
   mediaCode = this.media as Observable<any>;

   obsMenu = new BehaviorSubject(this.selectedMenu);
   menu = this.obsMenu as Observable<{}>;


  constructor(
      public http: HttpClient
  ) { }

  youtubeFeeds(): Observable<object>
  {   return this.http.get('/api/info/feeds/youtube/trending').pipe(
        catchError(error => throwError(error)));
  }

  playMedia(feed)
  {   
     if(feed){                 
         this.video = feed;         
     }     
   }
}
