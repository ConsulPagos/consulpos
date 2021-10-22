import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AfiliadoInterface } from 'src/app/models/afiliado';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { DocValidationService } from './services/doc-validation.service';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {



  constructor(private auth: AuthService, private doc: DocValidationService, private storage: StorageService, private api: ApiService, private route: Router) {

  }

  ngOnInit(): void {
    this.updateAcessLevel();
  }

  updateAcessLevel() {
    if (this.auth.getAccessLevel() == 2) {
      this.api.get_affiliate(this.auth.getUserId()).subscribe(af => {
        var current: AfiliadoInterface = af;
        this.storage.store('access_level', current.access_level);
        this.doc.verificate(false);
      });
    }
  }
}
