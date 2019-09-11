import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DecEncService } from '../services/dec-enc.service';

@Component({
  selector: 'app-product-fullview',
  templateUrl: './product-fullview.component.html',
  styleUrls: ['./product-fullview.component.css']
})
export class ProductFullviewComponent implements OnInit {
  private pid: string;
  private seckey: string = 'app-ent-domcatfish';

  constructor(
    private activatedRoute: ActivatedRoute,
    private _decEnc: DecEncService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((param) => {
      const { st } = param;
      console.log({st});

      this.pid = this._decEnc.aesDecryption(st.toString(), this.seckey);
      console.log({pid: this.pid});
    });
  }

}
