import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Currency} from '../model/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getTopCurrencies(): Observable<Currency[]> {
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('vs_currency', 'usd');
    params = params.append('ids', ['chainlink', 'ethereum', 'bitcoin'].join(','));
    params = params.append('order', 'market_cap_desc');
    params = params.append('per_page', '100');
    params = params.append('page', '1');
    params = params.append('sparkline', 'false');

    return this.httpClient.get<Currency[]>('https://api.coingecko.com/api/v3/coins/markets', {params});
  }
}
