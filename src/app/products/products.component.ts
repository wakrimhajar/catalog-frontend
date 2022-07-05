import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageProduct, Product } from '../model/product.model';
import { AuthentificationService } from '../services/authentification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products!:Array<Product>;
  currentpage: number=0;
  pageSize: number=5;
  totalPages: number=0;
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  currentAction: string="all";
  constructor(private productService: ProductService, private fb: FormBuilder, public authService: AuthentificationService,
    private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    })
    this.handleProductsPages();

  }
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data:any)=>{
        this.products = data;
      },
      error:(err)=>{
        this.errorMessage = err;
      }
    });
  }
  handleProductsPages(){
    this.productService.getPageProducts(this.currentpage,this.pageSize).subscribe({
      next:(data:any)=>{
        this.products = data.content;
        this.totalPages = data.totalPages;
      }
    })
  }
  gotoPage(i: number){
    this.currentpage=i;
    if(this.searchFormGroup.value.keyword==null){
      this.handleProductsPages();
    }else{
      this.handleSearchProducts();
    }
   
  }
  handleSearchProducts(){
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.getPageProductsByName(keyword,this.currentpage,this.pageSize).subscribe({
      next:(data:any)=>{
        this.products = data.content;
        this.totalPages = data.totalPages;
        console.log(data)
      }
    })
  }
  handleDeleteProduct(p: Product){
    let conf = confirm("Are you sure?");
    if(conf==false) return
    this.productService.deleteProduct(p.id).subscribe({
      next:(data:any)=>{
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }
  handleSetPromotion(p: Product){
    let promo = p.promotion
    this.productService.setPromotion(p.id).subscribe({
      next:(data:any)=>{
        p.promotion=!promo;
      },
      error:err => {
        this.errorMessage=err;
      }
    })
  }
  handleNewProduct(){
    this.router.navigateByUrl('/admin/newProduct');
  }
  handleEditProduct(p: Product){
    this.router.navigateByUrl("/admin/editProduct/"+p.id);
  }
  

}
