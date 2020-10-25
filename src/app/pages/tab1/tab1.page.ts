import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  paginaActual: number;

  constructor(private noticiasSrv: NoticiasService) {

  }

  ngOnInit(): void {

    this.paginaActual = 1;
    this.cargarNoticias(this.paginaActual);

  }

  loadData(event: any) {

    this.cargarNoticias(++this.paginaActual, event.target);

  }

  cargarNoticias(pagina: number, infiniteScrollCallback?: any) {

      this.noticiasSrv.getTopHeadlines(pagina)
        .subscribe( resp => {
          console.log(resp);

          this.noticias.push(...resp.articles);

          if (infiniteScrollCallback) {

            infiniteScrollCallback.complete();

            if (resp.articles.length === 0) {
              infiniteScrollCallback.disabled = true;
            }

          }

        });

  }

}
