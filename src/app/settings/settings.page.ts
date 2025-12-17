import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonSelect, 
  IonSelectOption, 
  IonButton 
} from '@ionic/angular/standalone';


@Component({
  standalone: true, 
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,   
    FormsModule,    
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonItem, 
    IonLabel, 
    IonSelect, 
    IonSelectOption, 
    IonButton
  ]
})
export class SettingsPage implements OnInit {

  
  measurementUnit: 'metric' | 'us' = 'metric';

  constructor(private router: Router) { }

  ngOnInit() {
    
    const savedUnit = localStorage.getItem('measurementUnit');
    if (savedUnit === 'metric' || savedUnit === 'us') {
      this.measurementUnit = savedUnit;
    }
  }

 
  saveSettings() {
    localStorage.setItem('measurementUnit', this.measurementUnit);
    alert(`Measurement unit set to ${this.measurementUnit.toUpperCase()}`);
    this.router.navigate(['/home']);
  }
  goHome() {
  this.router.navigate(['/home']);
}
}
