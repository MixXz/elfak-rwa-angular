import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GunAd } from 'src/app/models/gun-ad';

@Component({
  selector: 'app-gun-ad',
  templateUrl: './gun-ad.component.html',
  styleUrls: ['./gun-ad.component.css'],
})
export class GunAdComponent implements OnInit {
  @Input() ad: GunAd | null = null;

  imgPath: string = '../../../assets/';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.imgPath += this.ad?.gallery[0];
  }

  gotoDetails() {
    this.router.navigate(['gun-ad-details/' + this.ad?.id]);
  }
}
