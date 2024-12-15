import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input/input.component';
import { QaService } from './services/qa.service';
import { PanelComponent } from './components/panel/panel/panel.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, InputComponent, PanelComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  service = inject(QaService)

  data$ = this.service.feedbackData$;
  loading$ = this.service.loading$;
}
