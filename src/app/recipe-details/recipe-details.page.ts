import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
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
    IonThumbnail
  ]
})
export class RecipeDetailsPage implements OnInit {
  recipeId: number = 0;
  measurementUnit: 'metric' | 'us' = 'metric';
  recipe: any = {};
  isFavourite: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.recipeId = +id;

    const savedUnit = localStorage.getItem('measurementUnit');
    if (savedUnit === 'metric' || savedUnit === 'us') this.measurementUnit = savedUnit;

    this.fetchRecipeDetails(this.recipeId);
    this.loadFavouriteStatus();
  }

  fetchRecipeDetails(id: number) {
    const apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
    this.http.get<any>(url).subscribe(
      (res) => {
        this.recipe = res; 
      },
      (err) => {
        console.error('Error fetching recipe details:', err);
      }
    );
  }

  loadFavouriteStatus() {
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      const favourites: Recipe[] = JSON.parse(favouritesJSON);
      this.isFavourite = favourites.some(r => r.id === this.recipeId);
    }
  }

  toggleFavourite() {
    let favourites: Recipe[] = [];
    const favouritesJSON = localStorage.getItem('favourites');
    if (favouritesJSON) {
      favourites = JSON.parse(favouritesJSON);
    }

    if (this.isFavourite) {
      favourites = favourites.filter(r => r.id !== this.recipeId);
      this.isFavourite = false;
    } else {
      favourites.push({
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image
      });
      this.isFavourite = true;
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
