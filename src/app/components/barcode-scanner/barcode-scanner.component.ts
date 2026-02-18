import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { BarcodeFormat } from '@zxing/library'; // 👈 importa el enum correcto

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent {

  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;
  scannedResult = '';
  backendResponse: any;
  error = '';

 

   @Output() scanned = new EventEmitter<string>();

  // ✅ Enum formats, no strings
  allowedFormats = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_39
  ];

  constructor(private readonly http: HttpClient) {}

   // Ejemplo: función que se ejecuta cuando se detecta un código
  onCodeResult(result: string) {
    console.log('Código leído:', result);
    this.scanned.emit(result); // 🔥 Emitir el valor al componente padre
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    const backCamera = devices.find(d => /back|rear|environment/gi.test(d.label));
    this.selectedDevice = backCamera || devices[0];
  }

onScanSuccess(result: string) {
  if (result && result !== this.scannedResult) {
    this.scannedResult = result;
    this.onCodeResult(result);

    // Evitar lecturas duplicadas consecutivas
    setTimeout(() => this.scannedResult = '', 5000);
  }
}


  sendToBackend(code: string) {
    this.http.post('https://tu-backend.com/api/scan', { barcode: code }).subscribe({
      next: res => this.backendResponse = res,
      error: err => {
        console.error(err);
        this.error = 'Error enviando al backend';
      }
    });
  }
}
