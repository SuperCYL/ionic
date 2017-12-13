import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Highcharts from 'highcharts';
import $ from 'jquery';

import { ReportProvider } from "../../providers/report/report"

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
   countryList;
   countryTotal;
  constructor(public navCtrl: NavController, public navParams: NavParams,private reportProvider:ReportProvider) {
  }

   ionViewDidLoad() {
    this.getCountryList();
    this.getMapData();
    $("#reportTab li").click(function(){
      var isActive = $(this).hasClass('tab-active');
      var text = $(this).text();
      $(".pg-tit span").html(text);
      if(isActive === false){
          $(this).addClass('tab-active');
          $(this).siblings('li').removeClass('tab-active');
      }
    });
  }

  async getCountryList() {
    let mode = "week";
    await this.reportProvider.getCountrySales(mode).then((data) => {
      this.countryList = data["list"];
      this.countryTotal = data["total"].join("/");
      console.log(this.countryTotal);
    });
  }

  async getMapData() {
   // 初始化图表
    $('#AfricaMap').highcharts('Map', {
      title : {
          text : ""
      },
      subtitle : {
          text : '地图数据'
      },
      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'bottom'
          }
      },
      colorAxis: {
          min: 0,
          stops: [
              [0, '#EFEFFF'],
              [0.5, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
          ]
      },
      series : [{
          data : data,
          mapData: mapdata,
          joinBy: 'hc-key',
          name: '随机数据',
          states: {
              hover: {
                  color: '#a4edba'
              }
          },
          dataLabels: {
              enabled: false,
              format: '{point.name}'
          }
      }]
    });

  }
}