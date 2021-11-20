import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class AppService {
  private axios: Axios = null;

  constructor() {
    this.axios = new Axios({});
    this.axios.interceptors.response.use(r => r, this.handleAxiosError);
  }


  private handleAxiosError(err) {
    console.log(err);
  }

  private async getProduct(asin: string, productURL: string) {
    try {
      var amazonProduct = await this.axios.request({
        method: 'GET',
        url: 'https://amazon24.p.rapidapi.com/api/product/'.concat(asin),
        params: { productURL: productURL },
        headers: {
          'x-rapidapi-host': 'amazon24.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_TOKEN'
        }
      })
    } catch (e) {
      throw e;
    }
    return JSON.parse(amazonProduct.data);
  }


  async getData(): Promise<{ message: any; }> {
    try {
      var amazonProduct = await this.getProduct('0', 'https://www.amazon.com/dp/B07DBHRNXB?psc=6');
    } catch (e) {
      throw e;
    }
    return { message: amazonProduct };
  }

}
