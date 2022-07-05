import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageProduct, Product } from '../model/product.model';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!: Array<Product>;
  constructor(private http: HttpClient) { }


public getAllProducts():Observable<Array<Product>>{
  return this.http.get<Array<Product>>(environment.urlApi+'products');
}
public deleteProduct(id: number):Observable<any>{
 return this.http.delete(environment.urlApi+'products/'+id);
}
public setPromotion(id: number): Observable<any>{
  return this.http.put(environment.urlApi+'products/promotion/'+id,{});
}
getErrorMessage(fieldName:string, error:ValidationErrors){
  if(error['required']){
    return fieldName +" is required";
  }else if(error['minlength']){
    return fieldName+ " should have at least "+error['minlength']['requiredLength']+" characters";
  }else if(error['min']){
    return fieldName+ " should have min value "+error['min']['min'];
  }else return "";
}
public getProduct(id: String):Observable<Product>{
  
  //if(product == undefined) return throwError(()=> new Error("Product not found"));
  return this.http.get<Product>(environment.urlApi+'products/'+id);
}
public addNewProduct(product: Product):Observable<Product>{
  return this.http.post<Product>(environment.urlApi+'products',product);
}
public updateProduct(product: Product):Observable<Product>{
  return this.http.put<Product>(environment.urlApi+'products/'+product.id,product);
}
public getPageProducts(page:number,size:number):Observable<PageProduct>{
  return this.http.get<PageProduct>(environment.urlApi+'PagesProducts?page='+page+'&size='+size);
}
public getPageProductsByName(name:String,page:number,size:number):Observable<PageProduct>{
  return this.http.get<PageProduct>(environment.urlApi+'PagesProductsByName?search='+name+'&page='+page+'&size='+size);
}

}


