import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { History } from '../classes/History';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {

  historyProd : History;
  totalPrice: any;
  formattedDate: string;
  constructor(private service: HistoryService, private activated_route:ActivatedRoute) { }

  ngOnInit() {
    this.activated_route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('name')){
        return;
      }
      const prodName = paramMap.get('name');
      this.historyProd = this.service.getHistoryProdByName(prodName);
      this.formattedDate = this.historyProd.dateTime.toLocaleDateString('en-US') + " " + this.historyProd.dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
      this.totalPrice = this.historyProd.totalPrice.toFixed(2);
    })
  }

}
