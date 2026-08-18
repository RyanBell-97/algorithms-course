import { Routes } from '@angular/router';
import { CoursePageComponent } from './course-page/course-page.component';

export const routes: Routes = [
  { path: '', component: CoursePageComponent },
  { path: 'lesson/:id', component: CoursePageComponent },
  { path: '**', redirectTo: '' }
];
