import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
  public showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSlideWillChange(event) {
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

  onSkip() {
    this.router.navigateByUrl('/passport/signup');
  }

}
