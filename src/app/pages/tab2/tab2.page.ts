import { Component, ViewChild } from '@angular/core';
import { IonSegment, ViewDidEnter } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewDidEnter {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  constructor(private noticiasService: NoticiasService) {}

  ionViewDidEnter(): void {
    this.segment.value = this.categorias[0];
    this.noticiasService.getTopHeadlinesCategoria(this.segment.value)
                        .subscribe(resp => console.log(resp));
  }

}
