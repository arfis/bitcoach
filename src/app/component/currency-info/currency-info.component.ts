import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Currency} from './model/currency';
import {CurrencyService} from './service/currency.service';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.component.html',
  styleUrls: ['./currency-info.component.scss']
})
export class CurrencyInfoComponent implements OnInit {

  currencies$: Observable<Currency[]>;

  constructor(private currencyService: CurrencyService) {
    this.currencies$ = currencyService.getTopCurrencies();
  }

  ngOnInit(): void {
  }

}
