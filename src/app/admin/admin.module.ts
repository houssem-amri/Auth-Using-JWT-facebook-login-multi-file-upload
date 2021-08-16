import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SharedModule } from '../shared/shared.module';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableModule } from '../modules/data-table/data-table.module';
import { UploadFilesComponent } from './upload-files/upload-files.component';




@NgModule({
  declarations: [AddProductComponent, ProductTableComponent, ModalContentComponent, DataTableComponent, UploadFilesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule,
    DataTableModule,

  ],
  entryComponents: [ModalContentComponent]
})
export class AdminModule { }
