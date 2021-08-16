import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addEditProductForm: FormGroup
  product: any = {}
  id: any;
  title: String;
  imagePreview: String;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,

    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.title = 'Éditer';
      this.productService.getProductById(this.id).subscribe((data) => {
        this.product = data.product
      })

    } else {
      this.title = 'Ajouter';
    }
    this.addEditProductForm = this.formBuilder.group({
      nom: [''],
      categorie: [''],
      prix: [''],
      description: [''],
      image: ['']
    });

  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addEditProductForm.patchValue({ image: file });
    this.addEditProductForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  addEditproduct() {
    if (this.id) {
      this.productService.updateProduct(this.product).subscribe((data) => {
        console.log(data.message);
      });
      this.router.navigate(['admin/products-table']);
    } else {
      this.productService.addProduct(this.product, this.addEditProductForm.value.image).subscribe((data) => {
        console.log(data.message);
      });
      this.router.navigate(['admin/products-table']);
    }
  }

}
