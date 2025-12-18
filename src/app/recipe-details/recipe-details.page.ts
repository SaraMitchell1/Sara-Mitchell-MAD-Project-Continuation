import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { IonImg } from '@ionic/angular/standalone';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonButton, IonThumbnail 
} from '@ionic/angular/standalone';
import { Recipe } from '../models/recipe';

@Component({
  standalone: true,
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonImg, 
    IonThumbnail
  ]
})
export class RecipeDetailsPage implements OnInit {
  // ID of the recipe being viewed
  recipeId: number = 0;

  // Measurement unit selected in settings, default is metric
  measurementUnit: 'metric' | 'us' = 'metric';

   // Object holding the details of the recipe
  recipe: any = {};

   // This tracks whether this recipe is in favourites
  isFavourite: boolean = false;

  // Constructor injects Router, ActivatedRoute (for params), and HttpClient
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    // Get recipe ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.recipeId = +id;

    // Load the saved measurement unit from localStorage if it exists
    const savedUnit = localStorage.getItem('measurementUnit');
    if (savedUnit === 'metric' || savedUnit === 'us') this.measurementUnit = savedUnit;

     // Fetch recipe details from the API
    this.fetchRecipeDetails(this.recipeId);
    // Check if this recipe is already in favourites
    this.loadFavouriteStatus();
  }

  // Fetch detailed information about a recipe from Spoonacular API
  fetchRecipeDetails(id: number) {
    const apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    this.http.get<any>(url).subscribe(
      (res) => {
         // Save the response in the recipe object
        this.recipe = res; 
      },
      (err) => {
        console.error('Error fetching recipe details:', err);
      }
    );
  }

  // Loads the favourite status of this recipe from localStorage
  loadFavouriteStatus() {
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      const favourites: Recipe[] = JSON.parse(favouritesJSON);
      // Check if recipe ID exists in favourites
      this.isFavourite = favourites.some(r => r.id === this.recipeId);
    }
  }

  // Adds or removes the recipe from favourites
  toggleFavourite() {
    let favourites: Recipe[] = [];
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      favourites = JSON.parse(favouritesJSON);
    }

    if (this.isFavourite) {
       // Remove from favourites
      favourites = favourites.filter(r => r.id !== this.recipeId);
      this.isFavourite = false;
    } else {
            // Add to favourites
      favourites.push({
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image
      });
      this.isFavourite = true;
    }

    // Save updated favourites to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  // Navigate back to the home page
  goBack() {
    this.router.navigate(['/home']); 
  }
}
