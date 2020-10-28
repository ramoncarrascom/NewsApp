import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number = 0;

  constructor( private iab: InAppBrowser,
                private actionSheetCtrl: ActionSheetController ) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
      {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
        }
      },
      {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancelar');
        }
      }]}
    );

    await actionSheet.present();

  }
}
