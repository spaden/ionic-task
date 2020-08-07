import { Component, OnInit } from '@angular/core';
import { CreateAmcPage } from '../create-amc/create-amc.page';
import { ViewAllAmcPage } from '../view-all-amc/view-all-amc.page';
import {NavController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-manage-amc',
  templateUrl: './manage-amc.page.html',
  styleUrls: ['./manage-amc.page.scss'],
})
export class ManageAmcPage implements OnInit {
  createAmc = CreateAmcPage;
  viewAllAmc = ViewAllAmcPage;
  constructor(public platform: Platform,
              private nav: NavController) { 
    this.platform.backButton.subscribeWithPriority(0, () => {

        this.nav.pop();
        
    });
  }

  ngOnInit() {
  }

}
