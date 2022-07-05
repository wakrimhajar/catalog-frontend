import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  //users: AppUser[]=[];
  authenticatedUser: AppUser | undefined;
  constructor(private http: HttpClient) { 
   
  }

  public login(username:string,password:string):Observable<any>{
    let user =  { username:username, password:password};
    this.http.post(environment.urlApi+'login',user).subscribe({
      next:(data:any)=>{
       this.authenticatedUser = data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return of(user);
  }
  public authenticateUser(appUser:AppUser):Observable<boolean>{
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser",JSON.stringify({username:appUser.username,jwt:"JWT_TOKEN"}));
    return of(true);
  }
  public hasRole(role:string):boolean{
    return Object.values(this.authenticatedUser!.roles[0]).includes(role);
  }
  public isAuthenticated(){
    return this.authenticatedUser!=undefined;
  }
  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
