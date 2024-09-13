import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsService } from './services/questions.service';
import { InterviewDashboardComponent } from './interview-dashboard/interview-dashboard.component';
import { DomainDashboardComponent } from './domain-dashboard/domain-dashboard.component';
import { ComputerScienceComponent } from './computer-science/computer-science.component';
import { ElectronicsCommunicationComponent } from './electronics-communication/electronics-communication.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { ElectricalComponent } from './electrical/electrical.component';
import { CivilComponent } from './civil/civil.component';
// import { QuestionsComponent } from './questions/questions.component';
import { TestComponent } from './test/test.component';
// import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    AboutComponent,
    UserReviewComponent,
    InterviewDashboardComponent,
    DomainDashboardComponent,
    ComputerScienceComponent,
    ElectronicsCommunicationComponent,
    MechanicalComponent,
    ElectricalComponent,
    CivilComponent,
    // QuestionsComponent,
    TestComponent,
    // ContactComponent,
    LoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    QuestionsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
