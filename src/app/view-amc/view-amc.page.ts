import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-amc',
  templateUrl: './view-amc.page.html',
  styleUrls: ['./view-amc.page.scss'],
})
export class ViewAmcPage implements OnInit {

  showAMC = true;
  showWarranty = true;
  allData = [{
    Po_no: 'Ud21345',
    Start: '22/01/1994',
    End: '23/09/2111',
    Cost: '34532',
    Status: 'AMC'
  },
    { Po_no: 'Ad21345',
      Start: '22/01/1344',
      End: '23/09/2911',
      Cost: '54532',
      Status: 'Warranty'}];
  allAmc: any[];
  allWarranty: any[];
  constructor() { }
  getAmcData(): any[] {
    return this.allData.filter(all => all.Status === 'AMC');
  }
  getWarrantyData(): any[] {
    return this.allData.filter(all => all.Status === 'Warranty');
  }
  loadDisplay() {
    this.allAmc = this.getAmcData();
    this.allWarranty = this.getWarrantyData();
    this.showAMC = true;
    this.showWarranty = true;
  }
  showAMCOnly() {
    this.showAMC = true;
    this.showWarranty = false;
  }
  showWarrantyOnly() {
    this.showWarranty = true;
    this.showAMC = false;
  }
  ngOnInit() {
    this.loadDisplay();
  }

}
