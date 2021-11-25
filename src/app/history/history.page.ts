import { Component, OnInit } from '@angular/core';
import { History } from '../classes/History';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  histories: History[];
  constructor(private service: HistoryService) { }

  ngOnInit() {
    this.histories = this.service.getAllHistories();
  }

}
