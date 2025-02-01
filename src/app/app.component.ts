import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
