import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-logo',
  templateUrl: './main-logo.component.html',
  styleUrls: ['./main-logo.component.scss']
})
export class MainLogoComponent implements OnInit {

   logo: string = 'src/assets/images/azrin.jpg';

  constructor() { }

  ngOnInit() {
  }

}
