import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GaroshaPrimoAngularUIProject';

  constructor(private router : Router){}

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/signin']);
  }
}
