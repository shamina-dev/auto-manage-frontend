import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from './service-api.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-service-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {
  @Input() service!: Service;
  @Output() closeView = new EventEmitter<void>();

  qrDataUrl = '';

  ngOnInit(): void {
    this.generateQr();
  }

  /** Encode key service details into a real QR code using the qrcode library. */
  async generateQr(): Promise<void> {
    const payload = [
      `Service ID: ${this.service.id ?? 'N/A'}`,
      `Customer: ${this.service.customer_name}`,
      `Mechanic: ${this.service.mechanic}`,
      `Plate: ${this.service.license_plate}`,
      `Vehicle: ${this.service.vehicle_model}`,
      `Request: ${this.service.customer_request}`,
    ].join('\n');

    try {
      this.qrDataUrl = await QRCode.toDataURL(payload, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'M',
      });
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  }

  onClose(): void {
    this.closeView.emit();
  }
}

