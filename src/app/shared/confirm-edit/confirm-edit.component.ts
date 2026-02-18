import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PreguntaDto } from 'src/app/models/PreguntaDto';

@Component({
  selector: 'app-confirm-edit',
  templateUrl: './confirm-edit.component.html',
  styleUrls: ['./confirm-edit.component.css']
})
export class ConfirmEditComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; title?: string; pregunta: PreguntaDto }) { }

  ngOnInit(): void {
    this.filtrosForm.get('pregunta')?.setValue(this.data.pregunta);
  }

  public filtrosForm: FormGroup = this.fb.group({
    pregunta: [null, Validators.required]
  });



  onYes() {
    this.dialogRef.close({ action: true, texto: this.filtrosForm.get('pregunta')?.value });
  }

  onNo() {
    this.dialogRef.close({ action: false});
  }

}
