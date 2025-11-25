import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'client\src\app\components\login\login.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  msg: string = '';
  loading = false;

  constructor(private router: Router, private fb: FormBuilder, private _snackbar: MatSnackBar) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = false;
  }

  ingresar() {
    const dataInput = {
      username: this.form.value.usuario,
      password: this.form.value.password
    };

    if(dataInput.username === 'user' || dataInput.username === 'admin'){
      if (dataInput.username === 'user') {
        this.router.navigateByUrl('/perfil');
      }
      if (dataInput.username === 'admin') {
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.showMsg_snackBar("Usuario no valido");
    }

    this.loading = false;
  }

  showMsg_snackBar(msg: string){
    this._snackbar.open(msg, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  simulacionLoading(){
    this.loading = true;
    setTimeout(() => {
      this.ingresar();
    }, 1000);
  }
}