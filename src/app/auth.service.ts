import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private init_url = 'http://127.0.0.1:8000/'
  
  private login_url =  this.init_url+'api/auth/token/'
  private refresh_url =  this.init_url+'api/auth/token/refresh/'
  private get_current_user_url =  this.init_url+'getcurrentuser/'

  constructor(private _http: HttpClient, private router: Router) { }

  getCurrentUserName():any{
    return localStorage.getItem("userName")
  }
  getCurrentUserID():any{
    return localStorage.getItem("userID")


  }

  login(user){
    return this._http.post(this.login_url, user)

  }

  logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')     
    localStorage.removeItem("userID")
    localStorage.removeItem("userName")
    localStorage.removeItem("super_user")
    localStorage.removeItem("staff")
    this.router.navigate(["/login"])

  }



  loggedIn():any{
    return !!localStorage.getItem('access_token')
  }

  getToken():any{
    return localStorage.getItem('access_token')
  

}

logOut(){
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  this.router.navigate(['/login'])
}

refresh():any{
  const refresh = localStorage.getItem("refresh_token")
  const refresh_token = {
      "refresh":refresh
  }
  return this._http.post<any>(this.refresh_url,refresh_token)

}

resetPassword(password):any{
  const reset_password_url =  this.init_url+'api/auth/changepassword/'
  return this._http.post(reset_password_url, password)

}

addNewUser(user):any{
  const new_user_url =  this.init_url+'api/newuser/'
  return this._http.post(new_user_url, user)
}

checkedIfRegistred(){
  const url = this.init_url+'api/registred'
  return this._http.get(url)
}
register(user){
  const url =  this.init_url+'api/firsttimeregister/'
  return this._http.post(url,user)


}

}
