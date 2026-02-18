import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaDto } from 'src/app/models/PreguntaDto';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm-resultado',
  templateUrl: './confirm-resultado.component.html',
  styleUrls: ['./confirm-resultado.component.css']
})
export class ConfirmResultadoComponent implements OnInit {

  texto: any = "";
  coeficienteSi: number | undefined = 0.0;
  coeficienteNo: number | undefined = 0.0;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { coeficienteSi?: number; coeficienteNo?: number; pregunta: PreguntaDto }) { }

  ngOnInit(): void {
    this.texto = this.data.pregunta;
    if (this.data.coeficienteSi !== undefined && this.data.coeficienteNo !== undefined) {
      this.coeficienteSi = this.data.coeficienteSi;
      this.coeficienteNo = this.data.coeficienteNo;
    }
  }

  onNo() {
    this.dialogRef.close({ action: false });
  }
}