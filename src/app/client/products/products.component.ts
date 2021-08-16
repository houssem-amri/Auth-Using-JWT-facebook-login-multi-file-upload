import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: any
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProduct()
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe((data) => {
      this.product = data.product
      console.log(this.product);

    })
  }
}
