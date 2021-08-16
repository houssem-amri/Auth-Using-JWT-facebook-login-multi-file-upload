import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  product: any

  constructor(private productService: ProductService, private router: Router, public modalService: NgbModal) { }

  ngOnInit() {
    this.getAllProduct()
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe((data) => {
      this.product = data.product
    })
  }
  // deleteProduct(id: any) {
  //   this.productService.deleteProduct(id).subscribe((res) => {
  //     this.getAllProduct()
  //     console.log(res.message);

  //   })
  // }
  goToEdit(id: any) {
    this.router.navigate([`admin/add-product/${id}`])
  }
  openModal(id) {
    this.productService.getProductById(id).subscribe((res) => {
      const modalRef = this.modalService.open(ModalContentComponent);
      modalRef.componentInstance.productId = res.product._id;
      modalRef.result.then((result) => {
        if (result) {
          console.log(result);
        }
      });
    });

    // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
    //   console.log(receivedEntry);
    // })
  }


}
