/**
 * Created by liuzh on 17-8-18.
 */

import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class TranslateHelper {

  constructor(private translate: TranslateService)
  {
  }

  async translateI18n(key:string) {
    let text = await this.translate.get(key).map(async(res: string) => {
      return await res;
    }).toPromise();

    return text;
  }
}
