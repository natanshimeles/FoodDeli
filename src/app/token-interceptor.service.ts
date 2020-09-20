import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler):   Observable<HttpEvent<any>> {

    
    
    
    let tokenizeReq = req.clone({
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this._auth.getToken()}`
      
      })


      
    })

    return next.handle(tokenizeReq).pipe(
      catchError((error:HttpErrorResponse)=>
      {
        if(error.status == 401 && error.error.code == "token_not_valid"){
          
          
          this._auth.refresh().subscribe(
            res=> {
              localStorage.setItem("access_token",res.access)
              console.log("token refreshed")

              tokenizeReq = req.clone({
                headers:new HttpHeaders({
                  'Authorization': `Bearer ${this._auth.getToken()}`
                
                })})
                return next.handle(tokenizeReq)
              

            },
            err=>{
              console.log(err)
              this._auth.logOut()
            }
          )

        }
        else if(error.status == 401){
          this._auth.logOut()
        }
        else if(error.status == 404){}
       
        else{
          
        }

        return throwError(error)

      }

      ))







  }

   
    
  
  constructor(private _auth:AuthService){
    
  }
}
