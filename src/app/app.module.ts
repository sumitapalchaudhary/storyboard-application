import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessJsonService } from './services/process-json.service';
import { StoryBoardComponent } from './story-board/story-board.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { TransformData } from './common/transform-data';
import { Utility } from './common/utility';
import { DatePipe } from '@angular/common';
import { StoryBoardDialogComponent } from './story-board-dialog/story-board-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    StoryBoardComponent,
    StoryBoardDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgApexchartsModule,
    MatDialogModule
  ],
  providers: [ProcessJsonService, TransformData, Utility, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
