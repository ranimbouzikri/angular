import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Residence } from 'src/app/core/models/residence.model';
import { ResidenceService } from 'src/app/services/residence.service';

@Component({
  selector: 'app-add-residence-component',
  templateUrl: './add-residence-component.component.html',
  styleUrls: ['./add-residence-component.component.css']
})
export class AddResidenceComponent implements OnInit {
  residenceForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private residenceService: ResidenceService) {}

  ngOnInit() {
    this.residenceForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      image: ['', [Validators.required, Validators.pattern('https?://.+')]],
      status: ['Disponible'],
    });
  }

  onSubmit() {
    if (this.residenceForm.invalid) {
      return;
    }

    const newResidence: Residence = {
      id: Math.floor(Math.random() * 1000), // ✅ ID temporaire
      name: this.residenceForm.get('name')?.value,
      address: this.residenceForm.get('address')?.value,
      status: this.residenceForm.get('status')?.value,
      image: this.residenceForm.get('image')?.value,
    };

    // ✅ Ajoute dans le service
    this.residenceService.addResidence(newResidence);

    console.log('Nouvelle résidence ajoutée :', newResidence);

    // Réinitialise le formulaire
    this.residenceForm.reset();
    this.imagePreview = null;
  }
}
