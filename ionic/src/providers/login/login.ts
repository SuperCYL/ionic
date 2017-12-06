import { Injectable } from '@angular/core';
import {ProviderHelper} from "../helper/ProviderHelper";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public helper: ProviderHelper) {
    //console.log('Hello LoginProvider Provider');
  }

  async getEncryptPassword(password:string):Promise<any> {
    let res = await this.helper.request(`${this.helper.baseUrl}user/encrypt?key=${password}`);
    return res;
  }

  async doLogin(username:string, password:string) :Promise<any> {
      return await this.helper.request(`${this.helper.baseUrl}user/login?userCode=${username}&password=${password}`);
  }

}
