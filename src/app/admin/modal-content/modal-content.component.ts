import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {



  @Input() public productId;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.productId);


  }
  passBack() {
    this.passEntry.emit(this.productId);
    this.activeModal.close(this.productId);
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productId).subscribe((res) => {
      console.log(res.message);
      this.passBack();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['admin/products-table']);
      });

    })
  }





}
