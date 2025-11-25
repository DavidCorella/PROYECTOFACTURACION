import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Factura } from '../../../models/factura.model';
import { FacturaService } from '../../../service/factura';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-facturas-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Navbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './facturas-form.html',
  styleUrl: './facturas-form.css',
})
export class FacturasForm implements OnInit {

  idFactura: number = 0;
  textPantalla: string = 'Crear factura';
  isInsertar: boolean = true;
  form: FormGroup;
  factura = new Factura();

  constructor(
    private facturaService: FacturaService,
    private fb: FormBuilder,
    private router: Router,
    private _snackbar: MatSnackBar,
    private activeRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      numFactura: ['', Validators.required],
      nomCliente: ['', Validators.required],
      dirCliente: ['', Validators.required],
      telCliente: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      console.log(params);
      this.idFactura = params['id'];

      if (this.idFactura !== undefined) {
        this.isInsertar = false;
        this.textPantalla = "Modificar factura";
        
        this.facturaService.get(this.idFactura)
          .subscribe({
            next: (res: any) => {
              this.factura = res;
              this.form.setValue({
                numFactura: this.factura.numFactura,
                nomCliente: this.factura.nomCliente,
                dirCliente: this.factura.dirCliente,
                telCliente: this.factura.telCliente
              });

              console.log(this.factura);

              this._snackbar.open('La factura fue cargada con exito, por favor verificar', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            },
            error: (e: any) => console.error(e)
          });

        console.log('id factura' + this.idFactura);
      }
    });
  }

  saveFactura(): void {
    const data = {
      numFactura: this.form.value.numFactura,
      nomCliente: this.form.value.nomCliente,
      dirCliente: this.form.value.dirCliente,
      telCliente: this.form.value.telCliente
    };

    console.log(data);

    this.facturaService.create(data)
      .subscribe({
        next: (res: any) => {
          this.form.reset();
          console.log(res);
          this.router.navigateByUrl('dashboard/facturas');

          this._snackbar.open('La factura fue agregada con exito, por favor verificar', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        },
        error: (e: any) => console.error(e)
      });
  }

  modificarFactura(): void {
    const data = {
      numFactura: this.form.value.numFactura,
      nomCliente: this.form.value.nomCliente,
      dirCliente: this.form.value.dirCliente,
      telCliente: this.form.value.telCliente
    };

    console.log(data);

    this.facturaService.update(this.idFactura, data)
      .subscribe({
        next: (res: any) => {
          this.form.reset();
          console.log(res);
          this.router.navigateByUrl('/dashboard/facturas');

          this._snackbar.open('La factura fue modificada con exito, por favor verificar', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        },
        error: (e: any) => console.error(e)
      });
  }
}