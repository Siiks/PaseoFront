import { Component } from '@angular/core';
import { SupportService } from '../services/support.service';
import { Support } from '../models/support';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {

  message: Support;
  supportForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(private formBuilder: FormBuilder, private supportService: SupportService) {
    this.message = {
      email: '',
      mensaje: '',
      nombre: ''
    }
    this.supportForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.supportForm.invalid) {
      this.errorMessage = "Tiene que rellenar todos los campos"
      return;
    }
    const supportData: Support = {
      nombre: this.supportForm.value.nombre,
      email: this.supportForm.value.email,
      mensaje: this.supportForm.value.mensaje
    };

    this.supportService.postMessage(supportData)
      .then(() => {
        this.successMessage = "Su mensaje ha sido enviado con éxito!";
      })
      .catch(() => {
        this.errorMessage = "Ocurrió un error al enviar su mensaje";
      })
  }
}
