import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  @Input()
  title: string = ""

  @Input()
  score: number = 0

  @Input()
  issues: string[] = []

  @Input()
  feedback: string[] = []
}