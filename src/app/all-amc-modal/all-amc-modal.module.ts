import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllAmcModalPageRoutingModule } from './all-amc-modal-routing.module';

import { AllAmcModalPage } from './all-amc-modal.page';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AllAmcModalPageRoutingModule,
        AutocompleteLibModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
    ],
  declarations: [AllAmcModalPage]
})
export class AllAmcModalPageModule {}
