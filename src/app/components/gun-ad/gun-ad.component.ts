import { Component, Input, OnInit } from '@angular/core';
import { GunAd } from 'src/app/models/gun-ad';

@Component({
  selector: 'app-gun-ad',
  templateUrl: './gun-ad.component.html',
  styleUrls: ['./gun-ad.component.css'],
})
export class GunAdComponent implements OnInit {
  @Input() ad: GunAd | null = null;

  imgPath: string = '../../../assets/';

  constructor() {}

  ngOnInit(): void {
    this.imgPath += this.ad?.gallery[0];
  }
}
