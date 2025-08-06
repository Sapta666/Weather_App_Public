import { Routes } from '@angular/router';
import { Prac01Component } from './pages/prac-01/prac-01.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "Prac01"},
    
    { path: "Prac01", component: Prac01Component }
];
