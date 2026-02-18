export interface PersonaDto {
  id: number;
  primerNombre: string;
  segundoNombre: string | null;
  primerApellido: string;
  segundoApellido: string | null;
  tipoDocumento: string;
  documento: string;
  coeficiente: number;
  propiedad: string;
}
