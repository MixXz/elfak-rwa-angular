import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GunAd } from 'src/app/models/gun-ad';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gun-ad',
  templateUrl: './gun-ad.component.html',
  styleUrls: ['./gun-ad.component.css'],
})
export class GunAdComponent implements OnInit {
  @Input() ad: GunAd | null = null;
  imgPath: string = environment.api;
  rsdPrice?: number;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if(this.ad?.price)
    this.rsdPrice = this.ad?.price * 117;
  }

  gotoDetails() {
    this.router.navigate(['gun-ad-details/' + this.ad?.id]);
  }
}
