/**
 * Created by liuzh on 17-8-18.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestMethod, Response, RequestOptionsArgs} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise';
import {LoadingController} from "ionic-angular";

@Injectable()
export class ProviderHelper {
  public baseUrl = 'http://10.250.117.4/';

  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello Provider');
  }

  async request(url:string, method=RequestMethod.Get, showLoading=true, auth?:string, params?:any):Promise<any> {
    let loader;
    if(showLoading) {
      loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
    }

    let headers = new Headers();

    headers.append('content-type', 'application/json');

    if(auth)
      headers.append('Authorization', auth);

    let options = {method: method, headers: headers};

    if(params)
      options['body'] = params;

    let optionsArgs: RequestOptionsArgs = options;

    let res = await this.http.request(url, optionsArgs)
      .map(async(res :Response | any) => {
        try{
          if(showLoading) {
            if(loader){
              loader.dismiss();
              loader = null;
            }
          }

          return await res.json() || ''
        }catch (e){
          if(showLoading) {
            if(loader){
              loader.dismiss();
              loader = null;
            }
          }

          return await res['_body'];
        }
        /*if(typeof await res['_body'] === 'string'){
          return await res['_body'];
        }
        let body = await res.json() || '';
        return JSON.stringify(body);*/
      }).toPromise().catch(async(error: Response | any) => {
        let errMsg: string;
        if (error instanceof Response) {
          const body = await error.json() || '';
          const err = await body.error || JSON.stringify(body);
          // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          errMsg = err;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        if(showLoading) {
          if(loader){
            loader.dismiss();
            loader = null;
          }
        }
        return Promise.reject(errMsg);
      });

    return res;
  }
}
