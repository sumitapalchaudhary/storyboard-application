import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessJsonService } from './services/process-json.service';
import { StoryBoardComponent } from './story-board/story-board.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { TransformData } from './common/transform-data';
import { Utility } from './common/utility';

@NgModule({
  declarations: [
    AppComponent,
    StoryBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule
  ],
  providers: [ProcessJsonService, TransformData, Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
