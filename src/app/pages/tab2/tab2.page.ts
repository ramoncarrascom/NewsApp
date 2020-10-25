import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSegment, ViewDidEnter } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements ViewDidEnter {

  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  pagina: number;

  constructor(private noticiasService: NoticiasService) {}

  ionViewDidEnter(): void {

    console.log('ionViewDidEnter');
    this.segment.value = this.categorias[0];

  }

  cambioCategoria(event: any) {

    console.log('cambioCategoria');
    this.noticias = [];
    this.pagina = 0;
    this.infinite.disabled = false;
    this.cargarNoticias(event.detail.value);

  }

  loadData(event: any) {

    console.log('loadData');
    this.cargarNoticias(this.segment.value);

  }

  cargarNoticias(categoria: string) {

    console.log('cargarNoticias');
    this.noticiasService.getTopHeadlinesCategoria(categoria, ++this.pagina)
                        .subscribe(resp => {

                          console.log(resp);
                          this.noticias.push(...resp.articles);
                          this.infinite.complete();

                          if (resp.articles.length === 0) {
                            this.infinite.disabled = true;
                          }

                        });

  }
}
