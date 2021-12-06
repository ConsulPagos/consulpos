import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { ProductBoxComponent } from '../../components/product-box/product-box.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { CounterComponent } from '../../components/counter/counter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { FileUrlNamePipe } from '../../pipes/file-url-name.pipe';
import { UploadComponent } from '../../components/upload/upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { EditFieldDialogComponent } from '../../components/edit-field-dialog/edit-field-dialog.component';
import { SelloComponent } from '../../components/sello/sello.component';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FileUploadComponent } from '../../components/fiel-upload/file-upload.component';
import { FileUploadDirective } from '../../components/fiel-upload/file-upload.directive';
import { ProgressComponent } from '../../components/fiel-upload/progress/progress.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BottomFormComponent } from '../../components/bottom-form/bottom-form.component';
import { MatOptionModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActionBtnComponent } from '../../components/action-btn/action-btn.component';

@NgModule({
  declarations: [
    TitleComponent,
    ProductBoxComponent,
    ScrollToTopComponent,
    CounterComponent,
    ConfirmDialogComponent,
    ProductGridComponent,
    SnackbarComponent,
    FileUrlNamePipe,
    UploadComponent,
    EditFieldDialogComponent,
    SelloComponent,
    DateAgoPipe,
    FileUploadComponent,
    FileUploadDirective,
    ProgressComponent,
    BottomFormComponent,
    LoaderComponent,
    ActionBtnComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatIconModule,
    NgxIntlTelInputModule
    
  ],
  exports: [
    TitleComponent,
    ProductBoxComponent,
    FormsModule,
    ScrollToTopComponent,
    CounterComponent,
    ConfirmDialogComponent,
    ProductGridComponent,
    SnackbarComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    FileUrlNamePipe,
    UploadComponent,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    EditFieldDialogComponent,
    MatDividerModule,
    SelloComponent,
    DateAgoPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    FileUploadComponent,
    FileUploadDirective,
    ProgressComponent,
    MatMenuModule,
    MatSidenavModule,
    BottomFormComponent,
    MatProgressBarModule,
    MatIconModule,
    NgxIntlTelInputModule,
    LoaderComponent,
    ActionBtnComponent

  ]
})
export class SharedModule { }
