export interface AsistenciaDto {
  id: number;
  documento: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  estado: string;
  asambleaId: number;
  horaInicio: string; // formato HH:mm:ss
  horaFin: string;    // formato HH:mm:ss
  coeficienteAsistencia: number;
  mensaje: string | null;
  propiedad: string;
}
