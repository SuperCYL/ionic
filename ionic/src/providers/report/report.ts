import { Injectable } from '@angular/core';
import {ProviderHelper} from "../helper/ProviderHelper";
import { RequestMethod } from '../../../node_modules/_@angular_http@5.0.1@@angular/http/src/enums';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportProvider {

  constructor(public helper: ProviderHelper) {
    
  }

  async getCountrySales(mode:string,showLoading=true, auth:string) :Promise<any> {
      let res = await this.helper.request(`${this.helper.baseUrl}enterSellWater/getCountrySales?mode=${mode}`, RequestMethod.Get, showLoading, auth);
      return res;
  }

  async getAreaSales(mode:string,showLoading=true, auth:string) :Promise<any> {
    let res = await this.helper.request(`${this.helper.baseUrl}enterSellWater/getAreaSales?mode=${mode}`,RequestMethod.Get, showLoading, auth);
    return res;
  }

  async getCompanySales(mode:string,showLoading=true, auth:string) :Promise<any> {
    let res = await this.helper.request(`${this.helper.baseUrl}enterSellWater/getCompanySales?mode=${mode}`,RequestMethod.Get, showLoading, auth);
    return res;
  }

  async getCountryOneLevelSales(mode:string,showLoading=true, auth:string) :Promise<any> {
    let res = await this.helper.request(`${this.helper.baseUrl}enterSellWater/getCountryOneLevelSales?mode=${mode}`,RequestMethod.Get, showLoading, auth);
    return res;
  }
}
