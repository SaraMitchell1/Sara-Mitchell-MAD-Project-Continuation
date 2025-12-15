import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonList, IonItem, IonThumbnail, IonLabel, IonInput 
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
    IonInput
  ],
})
export class HomePage {
  ingredients: string = ''; 
  recipes: Recipe[] = [];  

  constructor(private router: Router, private http: HttpClient) {}

  goToDetails(recipeId: number) {
    this.router.navigate(['/recipe-details', recipeId]);
  }

  searchRecipes() {
    console.log('Searching for ingredients:', this.ingredients);
    this.fetchRecipesFromAPI(this.ingredients);
  }

  fetchRecipesFromAPI(ingredients: string) {
    const apiKey = '70759a4f7911402abcc53d3c51d3b759';
    const query = encodeURIComponent(ingredients);
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    this.http.get<any>(url).subscribe(
      (res) => {
        console.log('API response:', res);
        this.recipes = res.results; 
      },
      (err) => {
        console.error('API error:', err);
      }
    );
  }
}
