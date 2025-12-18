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
  IonButton,
  IonRadio,
  IonRadioGroup 
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
    IonButton,
    IonRadio,
    IonRadioGroup
  ]
})
export class SettingsPage implements OnInit {

  // Stores the selected measurement unit, default is metric
  measurementUnit: 'metric' | 'us' = 'metric';

  constructor(private router: Router) { }

  ngOnInit() {
    // Load previously saved measurement unit from local storage
    const savedUnit = localStorage.getItem('measurementUnit');
    if (savedUnit === 'metric' || savedUnit === 'us') {
      this.measurementUnit = savedUnit;
    }
  }

 // Save the selected measurement unit to local storage
  saveSettings() {
  localStorage.setItem('measurementUnit', this.measurementUnit);
}
// Navigate back to the Home page
  goHome() {
  this.router.navigate(['/home']);
}
}
