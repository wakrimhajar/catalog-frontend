import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId!: String;
  product!: Product;
  productUFormGroup!: FormGroup;
  constructor(private route: ActivatedRoute, public prodService: ProductService,
    private fb: FormBuilder, private router: Router) {
    this.productId = this.route.snapshot.params['id'];
   }

   ngOnInit(): void {
    this.prodService.getProduct(this.productId).subscribe({
      next:(product:Product)=>{
        this.product = product;
        this.productUFormGroup=this.fb.group({
          name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price: this.fb.control(this.product.price, [Validators.required, Validators.min(200)]),
          promotion: this.fb.control(this.product.promotion, [Validators.required])
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  handleUpdateProduct(){
    let p = this.productUFormGroup.value;
    p.id = this.product.id;
    this.prodService.updateProduct(p).subscribe({
      next:(prod: Product)=>{
        alert("Product updated successfully");
        this.router.navigateByUrl("/admin/products");
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
