import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {MdDialog} from '@angular/material';
import { AlertService, AuthenticationService } from '../../modulos_login/_services/index';
import { LoginObject } from "../../modulos_login/_services/login-object.model";
import { Session } from "../../modulos_login/_models/session.model";
import { UserService } from '../../modulos_login/_services/user.service';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    color = 'primary';
    mode = 'buffer';
    value = 0;
    bufferValue = 0;
    public loginForm: FormGroup;
    public submitted: Boolean = false;
    public error: { code: number, message: string } = null;

  constructor(
        private formBuilder: FormBuilder,
        private userservice: UserService,
        private storageService: AuthenticationService,
        private router: Router
  ) { }

    ngOnInit() {
        this.Noload();
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })
    }

    public submitLogin(): void {
        this.load();
        this.submitted = true;
        this.error = null;
        if (this.loginForm.valid){
            
            this.userservice.login(new LoginObject(this.loginForm.value)).subscribe(
            data => {
                this.correctLogin(data)},
            error => {
                this.error = JSON.parse(error._body)                 
                this.Noload();
                }
            )
        }else{
            this.Noload();
        }
        
    }

    private correctLogin(data: Session) {
        this.storageService.setCurrentSession(data);
        this.router.navigate(['/home']);
    }

    public Noload(): void{
        console.log('No Existe');
        this.mode="buffer";
        this.value = 0;
        this.bufferValue = 0;
    }

    public load(): void{
        this.mode="indeterminate";
        this.value = 50;
        this.bufferValue = 75;
    }

    public register(): void{
        this.router.navigate(['/register']);
    };
}