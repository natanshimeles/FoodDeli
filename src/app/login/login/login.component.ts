import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  tokens

  constructor(private formBuilder:FormBuilder,private router:Router, private _auth: AuthService,private snack:MatSnackBar) { }
  loginInProgress = false
  loginForm = this.formBuilder.group({
    username:['', [Validators.required]],
    password:['',[Validators.required]]
  })
  error :any
  

  ngOnInit(){
    
  }
  login(){
    this.loginInProgress = true
    let i = 0;
(function repeat(times){
  if (++i > 5) return;
  setTimeout(function(){
    console.log("Iteration: " + i);
    repeat();
  }, 5000000);
})();
    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value
    const user = {username:username, password:password}
    this._auth.login(user).subscribe(
      res=>{
        this.tokens = res
        
        
    
        localStorage.setItem('access_token',this.tokens.access)
        localStorage.setItem('refresh_token',this.tokens.refresh)
        localStorage.setItem("userID",this.tokens.user_id)
        localStorage.setItem("userName",this.tokens.user_name)
        localStorage.setItem('staff',this.tokens.staff)
        localStorage.setItem('super_user',this.tokens.super_user)
        
      this.router.navigate(['/'])

      },
      err=>{
        let horizontalPosition :MatSnackBarHorizontalPosition = 'center'
        let verticalPosition:MatSnackBarVerticalPosition  = 'top'

        console.log(err.error);
        this.error = err.error
        this.snack.open(this.error,'End now', {
          duration: 5000,
          horizontalPosition: horizontalPosition,
          verticalPosition: verticalPosition,
        });
        
        

      }
    )
    this.loginInProgress = true
    
    


  }

}
