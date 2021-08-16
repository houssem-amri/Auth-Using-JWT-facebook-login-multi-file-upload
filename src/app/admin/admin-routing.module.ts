import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';


const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-product/:id', component: AddProductComponent },
  { path: 'products-table', component: ProductTableComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: 'upload', component: UploadFilesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
