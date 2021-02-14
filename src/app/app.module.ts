import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';   
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatBotComponent,
    SupportDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
