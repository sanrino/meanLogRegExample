import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
      loading = false;
      submitted = false;
      returnUrl: string;

  constructor( private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,private api: ApiService) { }

        ngOnInit() {
              this.loginForm = this.formBuilder.group({
                  username: ['', Validators.required],
                  password: ['', Validators.required]
              });
          }

          get f() { return this.loginForm.controls; }

          onSubmit(form:NgForm) {
            let values = form.value;
            this.api.getUserByName(values.username,values.password)
           .subscribe(res => {
             if (res.length!=0){
               localStorage.setItem('currentUser',res[0]._id);
             }
               this.submitted = true;
               this.router.navigate(['/']);
             }, (err) => {
               console.log(err);
             });


              // stop here if form is invalid
              if (this.loginForm.invalid) {
                  return;
              }

              this.loading = true;

          }


}
