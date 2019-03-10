import { GlobalService } from './../global-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-card',
  templateUrl: './generate-card.component.html',
  styleUrls: ['./generate-card.component.css']
})
export class GenerateCardComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
  }

}
