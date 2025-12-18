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
  // Array to hold favourite recipes
  favourites: Recipe[] = [];

   // Router to navigate to other pages
  constructor(private router: Router) { }

   // Lifecycle hook: runs when the page is initialized
  ngOnInit() {
    this.loadFavourites(); // Load favourites from local storage
  }

  // Load favourites from localStorage
  loadFavourites() {
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      this.favourites = JSON.parse(favouritesJSON); // Parse JSON into array
    }
  }

  // Navigate to recipe details page for a given recipe ID
  goToDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }

   // Navigate back to the home page
  goHome() {
  this.router.navigate(['/home']);
}
}
