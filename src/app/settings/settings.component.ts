import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  frontEnds: string[];
  preferredFrontEnd: string;
  constructor() {
    this.frontEnds = ['steemit.com', 'busy.org'];
  }

  ngOnInit() {
  }

}
