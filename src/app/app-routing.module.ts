import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewDashboardComponent } from './interview-dashboard/interview-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DomainDashboardComponent } from './domain-dashboard/domain-dashboard.component';
import { ComputerScienceComponent } from './computer-science/computer-science.component';
import { ElectronicsCommunicationComponent } from './electronics-communication/electronics-communication.component';
import { ElectricalComponent } from './electrical/electrical.component';
import { MechanicalComponent } from './mechanical/mechanical.component';
import { CivilComponent } from './civil/civil.component';
// import { CompanyDetailsComponent } from './company-details/company-details.component';
// import { QuestionsComponent } from './questions/questions.component';
// import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
// import { CompanyComponent } from './company/company.component';
import { UserStepsComponent } from './user-steps/user-steps.component';
import { AdminComponent } from './admin/admin.component';
import { PaginationModule } from './pagination/pagination.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  { path: 'interview-dashboard', component: InterviewDashboardComponent },
  {
    path: '', component: DashboardComponent, pathMatch: 'full'
  },
  { path: 'about', component: AboutComponent },
  { path: 'user-review', component: UserReviewComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'domain-dashboard', component: DomainDashboardComponent, },
  { path: 'footer', component: FooterComponent },
  {
    path: 'computer-science', component: ComputerScienceComponent
  },
  {
    path: 'electrical', component: ElectricalComponent
  },

  {
    path: 'electronics-communication', component: ElectronicsCommunicationComponent
  },

  {
    path: 'mechanical', component: MechanicalComponent
  },

  {
    path: 'civil', component: CivilComponent
  },
  {
    path: 'user-steps', component: UserStepsComponent
  },
  {
    path: 'questions',
    loadChildren: () => import('./questions/questions.module').then(m => m.QuestionsModule)
  },
  {
    path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  { path: 'domain-dashboard', loadChildren: () => import('./domain/domain.module').then(m => m.DomainModule) },
  { path: 'login', component: LoginComponent },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },

  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'company-review', component: ReviewsComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
