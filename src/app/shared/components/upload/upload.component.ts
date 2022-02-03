import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Output() progress = new EventEmitter<number>();
  @Output() url = new EventEmitter<string>();

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  loading = false;

  constructor(private _storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  upload(event) {
    this.loading = true;
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    const filepath = `documentos/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task: AngularFireUploadTask = this._storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    this.uploadProgress.subscribe(v => {
      this.progress.emit(v);
    })

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.uploadURL = fileRef.getDownloadURL()
        this.uploadURL.subscribe(u => {
          this.url.emit(u);
          this.loading = false;
        })
      })).subscribe();
  }

  
}