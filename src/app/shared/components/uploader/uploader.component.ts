import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DefaultResponse } from 'src/app/models/default_response';
import * as _ from 'lodash';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  default: DefaultResponse;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  @Output() uploaded: EventEmitter<any> = new EventEmitter();
  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
  }

  fileChangeEvent(fileInput: any) {
    console.log(fileInput.target.id);
    for (let index = 0; index < fileInput.target.files.length; index++) {
      const g = fileInput.target.files[index];
      console.log(g.name);
      var ext = g.name.split('.').pop();
      console.log(ext);
    }

    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files);
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'application/msword'];
      const max_height = 15200;
      const max_width = 25600;
      /////////////////////////
      if (fileInput.target.files[0].size > max_size) {
        this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Solo imagenes ( JPG | PNG )';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {

            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
            this.uploaded.next({
              ext: ext,
              file: this.cardImageBase64,
              id: this.id
            })
            console.log("Yo soy tu padre");
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }


}
