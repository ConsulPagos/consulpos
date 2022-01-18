import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BancoInterface } from 'src/app/models/banco';
import { StorageService } from 'src/app/shared/services/storage.service';
import { constant } from 'src/app/shared/utils/constant';

@Component({
  selector: 'app-cobro-centralizado',
  templateUrl: './cobro-centralizado.component.html',
  styleUrls: ['./cobro-centralizado.component.scss']
})
export class CobroCentralizadoComponent implements OnInit {

  form = new FormGroup({
    banco: new FormControl(null, [Validators.required]),
    option: new FormControl('', [Validators.required]),
  });
  bancos: BancoInterface[];

  constructor(private storage: StorageService,
  ) {
    this.bancos = JSON.parse(this.storage.get(constant.BANCOS)).bancos

  }

  ngOnInit(): void {
  }

}
