import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { navigationAdmin } from 'app/navigation/navigationAdmin';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { User } from 'app/model/user.model';






@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  sessiontoken : any;
  user : User;
  

  constructor(  private router: Router,
    private _fuseNavigationService: FuseNavigationService,
    private httpClient:HttpClient) { }

  authenticate(credentials): Observable<any> {
    const data = {
        username: credentials.username,
        password: credentials.password
        
    };
    console.log(data);
    console.log(credentials.username);


    return this.httpClient.post('http://localhost:8084/api/authenticate', data, { observe: 'response' }).pipe(map(authenticateSuccess.bind(this)));
   
    

    function authenticateSuccess(resp) {
      console.log(data);
      
      
     
      
      

      this.router.navigate(['/apps/dashboards/analytics']);
        const bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
            const jwt = bearerToken.slice(7, bearerToken.length);
           
            return jwt;
        }
       
    }

   
}




login(credentials, callback?) {
  const cb = callback || function() {};
  console.log('aaa');

  return new Promise((resolve, reject) => {
      this.authenticate(credentials).subscribe(
          token => {
           this.sessiontoken=token;
           console.log(this.sessiontoken);

            sessionStorage.setItem('token',JSON.stringify(token));
            const httpOptions = {
              headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer '+this.sessiontoken 
              })
            };
      console.log('qsqsqsq');
              return new Promise((resolve, reject) => {
                      this.httpClient.get('http://localhost:8084/api/users/'+ credentials.username,httpOptions)
                          .subscribe((response: any) => {
                              this.user = response;
                              console.log(this.user);
                              sessionStorage.setItem('user',JSON.stringify(this.user));
                              
                              
                              
                              
                              
                              if (this.user.authorities == 'ROLE_USER') 
                              {
                              this._fuseNavigationService.setCurrentNavigation('user');
                              };
                              if (this.user.authorities == 'ROLE_ASSISTANT') 
                              {
                              this._fuseNavigationService.setCurrentNavigation('assistant');
                              };
                              if (credentials.username == 'admin')
                              {
                              this._fuseNavigationService.setCurrentNavigation('admin');
                              };

                              console.log(this.user.authorities);
                              resolve(this.user);
                          }, reject);
                  }
              );
            
             
              
          },
         
      );
  });
}



  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}