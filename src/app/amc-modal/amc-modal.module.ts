import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmcModalPageRoutingModule } from './amc-modal-routing.module';

import { AmcModalPage } from './amc-modal.page';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AmcModalPageRoutingModule,
        AutocompleteLibModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
  declarations: [AmcModalPage],
})
export class AmcModalPageModule {}
