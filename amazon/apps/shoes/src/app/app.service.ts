import { Injectable } from '@nestjs/common';
import {Axios} from 'axios';

@Injectable()
export class AppService {
private axios: Axios = null;

  constructor(){
    this.axios = new Axios({});
    this.axios.interceptors.response.use(r=>r, this.handleAxiosError);
  }


  private handleAxiosError(err){
    console.log(err);
  }

  private async getProduct(asin: string){
    console.log('test');
    var amazonProduct = await this.axios.request({
      method: 'GET',
      url: 'https://amazon24.p.rapidapi.com/api/product/'.concat(asin),
      headers: {
        'x-rapidapi-host': 'amazon24.p.rapidapi.com',
        'x-rapidapi-key': 'ce7b76fd45mshae4314f1df45c64p19eac4jsn232cf211ec44'
      }
    })

    return amazonProduct;
  }  


  async getData(): Promise<{ message: any; }> {
    var amazonProduct = await this.getProduct('B07DBM6WG4');
    console.log(amazonProduct);
    const jsonText = JSON.stringify(amazonProduct);

    return { message: JSON.parse(jsonText) };
  }
}
