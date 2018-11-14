import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../guards/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

     // reset login status
     console.log('logging out');
     this.authenticationService.logout();

     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  login() {
    this.loading = true;
    console.log('asd');
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                sessionStorage.setItem('id', data.id);
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.loading = false;
            });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

}
