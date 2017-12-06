import { Injectable } from '@angular/core';
import {ProviderHelper} from "../helper/ProviderHelper";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportProvider {

  constructor(public helper: ProviderHelper) {
    
  }

  async doLogin(username:string, password:string) :Promise<any> {
      let res = await this.helper.request(`${this.helper.baseUrl}user/login?userCode=${username}&password=${password}`);
      return res;
  }

}
