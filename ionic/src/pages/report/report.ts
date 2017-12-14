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
    var chart = Highcharts.chart('AfricaMap', {
        title: {
            text: '不同城市的月平均气温',
            x: -20
        },
        subtitle: {
            text: '数据来源: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {
            title: {
                text: '温度 (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '东京',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '纽约',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: '柏林',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
  }
}