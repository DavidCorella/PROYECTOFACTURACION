import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../service/factura';
import { Navbar } from '../navbar/navbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css',
})
export class Facturas implements OnInit {

  listaFacturas: Factura[] = [];
  displayedColumns: string[] = ['numFactura', 'nomCliente', 'dirCliente', 'telCliente', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private facturaService: FacturaService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.consultarFacturas();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  consultarFacturas(): void {
    this.facturaService.getAll()
      .subscribe({
        next: (data) => {
          this.listaFacturas = data;
          this.dataSource = new MatTableDataSource(this.listaFacturas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

  eliminarFactura(element: any) {
    Swal.fire({
      title: `¿Desea eliminar la factura #${element.numFactura} a nombre de ${element.nomCliente}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(element._id);
        this.facturaService.delete(element._id)
          .subscribe({
            next: (data) => {
              this.consultarFacturas();
              console.log(data);

              this._snackbar.open('La factura eliminada correctamente', '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            },
            error: (e: any) => console.error(e)
          });
      }
    });
  }

  modificarFactura(element: any) {
    Swal.fire({
      title: `¿Desea modificar la factura #${element.numFactura} a nombre de ${element.nomCliente}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, modificar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(element._id);
        this.router.navigateByUrl(`dashboard/facturas/${element._id}`);
      }
    });
  }
}