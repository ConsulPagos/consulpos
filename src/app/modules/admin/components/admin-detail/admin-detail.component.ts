import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormInterface } from 'src/app/models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  @Input() affiliate: UserFormInterface;
  @Output() reload = new EventEmitter<boolean>();
  loading = false;

  constructor(private admin: AdminService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openDialog(type): void {
    switch (type) {
      case 1:
        var body = 'Se aprobará el acceso del afiliado #' + this.affiliate.id_usuario;
        break;
      case 2:
        var body = 'Se verificará la cuenta del afiliado #' + this.affiliate.id_usuario;
        break;
    }
  }



}
