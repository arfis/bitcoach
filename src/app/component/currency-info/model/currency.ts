export interface Currency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: string;
  ath_date: Date;
  atl: number;
  atl_change_percentage: string;
  atl_date: Date;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: Date;
}
