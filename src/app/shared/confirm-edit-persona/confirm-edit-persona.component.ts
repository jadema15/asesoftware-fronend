import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PersonaDto } from 'src/app/models/PersonasDto';

@Component({
  selector: 'app-confirm-edit-persona',
  templateUrl: './confirm-edit-persona.component.html',
  styleUrls: ['./confirm-edit-persona.component.css']
})
export class ConfirmEditPersonaComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { persona: PersonaDto }) { }

  ngOnInit(): void {
    console.log(this.data);
    this.filtrosForm.get('primerNombre')?.setValue(this.data.persona.primerNombre);
    this.filtrosForm.get('primerApellido')?.setValue(this.data.persona.primerApellido);
    this.filtrosForm.get('segundoApellido')?.setValue(this.data.persona.segundoApellido);
    this.filtrosForm.get('segundoNombre')?.setValue(this.data.persona.segundoNombre);
    this.filtrosForm.get('documento')?.setValue(this.data.persona.documento);
    this.filtrosForm.get('propiedad')?.setValue(this.data.persona.propiedad);
  }

  public filtrosForm: FormGroup = this.fb.group({
    primerNombre: [null, Validators.required],
    primerApellido: [null, Validators.required],
    segundoApellido: [null],
    segundoNombre: [null],
    documento: [null, Validators.required],
    propiedad: [null, Validators.required]
  });



  onYes() {
    this.dialogRef.close({ action: true, texto: this.filtrosForm});
  }

  onNo() {
    this.dialogRef.close({ action: false });
  }

}
