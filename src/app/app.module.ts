import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './posts/posts.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatProgressSpinnerModule}from '@angular/material/progress-spinner'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
