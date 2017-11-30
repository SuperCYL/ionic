import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingPage } from '../setting/setting';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];
  
  constructor() {
    this.tabRoots = [
      {
        root: AboutPage,
        tabTitle: 'Home',
        tabIcon: 'information-circle'
      },
      {
        root: ContactPage,
        tabTitle: 'Contact',
        tabIcon: 'contacts'
      },
      {
        root: HomePage,
        tabTitle: 'Come',
        tabIcon: 'home'
      },
      {
        root: SettingPage,
        tabTitle: 'Settting',
        tabIcon: 'contacts'
      }
    ]
  }
}
