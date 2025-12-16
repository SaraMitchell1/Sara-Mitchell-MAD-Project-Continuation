import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonThumbnail, IonLabel, IonButton, CommonModule, FormsModule]
})
export class FavouritesPage implements OnInit {
  favourites: Recipe[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadFavourites();
  }

  loadFavourites() {
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      this.favourites = JSON.parse(favouritesJSON);
    }
  }

  goToDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }
}
