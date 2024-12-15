import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QaService } from '../../../services/qa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  form = new FormGroup({
    url: new FormControl("", [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/)])
  })

  service = inject(QaService);

  getFeedback() {
    this.service.sendMessage(this.form.get("url")?.value!)
  }
}
