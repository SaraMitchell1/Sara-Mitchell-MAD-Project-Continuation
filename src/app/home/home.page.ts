import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonList, IonItem, IonThumbnail, IonLabel, IonInput, IonButtons, IonIcon 
} from '@ionic/angular/standalone';
import { Recipe } from '../models/recipe';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonInput,
    IonButtons,
    IonIcon
  ],
})

export class HomePage {
   // Stores the ingredients entered by the user
  ingredients: string = ''; 

   // Array to hold the recipes returned by the Spoonacular API
  recipes: Recipe[] = [];  

  constructor(private router: Router, private http: HttpClient) {}

// Navigate to the Recipe Details page for a specific recipe
  goToDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }

   // Tracks whether the API request has completed (used to show "No recipes found" message)
recipesLoaded: boolean = false;

// Called when the Search button is pressed
searchRecipes() {
  console.log('Searching for ingredients:', this.ingredients);

  // Fetch recipes from the Spoonacular API based on input
  this.fetchRecipesFromAPI(this.ingredients);
}
// Makes a GET request to the Spoonacular API to fetch recipes
  fetchRecipesFromAPI(ingredients: string) {
    const apiKey = '70759a4f7911402abcc53d3c51d3b759';
    const query = encodeURIComponent(ingredients);
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    // HTTP request to get recipe data
    this.http.get<any>(url).subscribe(
      (res) => {
        console.log('API response:', res);

        // Store the returned recipes in the recipes array
        this.recipes = res.results; 

          // Set flag to true so the UI knows the request is done
        this.recipesLoaded = true;
      },
      (err) => {
        console.error('API error:', err);

        // If there is an error, clear recipes and still mark as loaded
        this.recipes = [];
      this.recipesLoaded = true;
      }
    );
  }

  // Navigate to the Favourites page
  goToFavourites() {
    this.router.navigate(['/favourites']);
  }

  // Navigate to the Settings page
  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
