import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonButton, IonThumbnail 
} from '@ionic/angular/standalone';

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

 
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.recipeId = +id;

   
    const savedUnit = localStorage.getItem('measurementUnit');
    if (savedUnit === 'metric' || savedUnit === 'us') this.measurementUnit = savedUnit;

    
    this.fetchRecipeDetails(this.recipeId);
  }

  fetchRecipeDetails(id: number) {
    const apiKey = '70759a4f7911402abcc53d3c51d3b759'; 
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

   
    this.http.get<any>(url).subscribe(
      (res) => {
        console.log('Recipe details fetched:', res);
        this.recipe = res; 
      },
      (err) => {
        console.error('Error fetching recipe details:', err);
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
