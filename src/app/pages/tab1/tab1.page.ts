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

  constructor(private noticiasSrv: NoticiasService) {

  }

  ngOnInit(): void {
    this.noticiasSrv.getTopHeadlines()
      .subscribe( resp => {
        console.log(resp);
        this.noticias.push(...resp.articles);
      });
  }

}
