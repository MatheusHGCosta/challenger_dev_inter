import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-timezone-dropdown',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.css'],
  imports:[FormsModule,CommonModule],
  standalone:true
})
export class TimezoneDropdownComponent {
  timezones: { label: string, value: string }[] = [
    { label: '(UTC-12:00) International Date Line West', value: 'Etc/GMT+12' },
    { label: '(UTC-11:00) Midway Island, Samoa', value: 'Pacific/Midway' },
    { label: '(UTC-10:00) Hawaii', value: 'Pacific/Honolulu' },
    { label: '(UTC-09:00) Alaska', value: 'America/Anchorage' },
    { label: '(UTC-08:00) Pacific Time (US & Canada)', value: 'America/Los_Angeles' },
    { label: '(UTC-07:00) Mountain Time (US & Canada)', value: 'America/Denver' },
    { label: '(UTC-06:00) Central Time (US & Canada)', value: 'America/Chicago' },
    { label: '(UTC-05:00) Eastern Time (US & Canada)', value: 'America/New_York' },
    { label: '(UTC-03:00) Brasília', value: 'America/Sao_Paulo' },
    { label: '(UTC+00:00) London', value: 'Europe/London' },
    { label: '(UTC+01:00) Berlin, Paris, Rome', value: 'Europe/Berlin' },
    { label: '(UTC+03:00) Moscow, St. Petersburg', value: 'Europe/Moscow' },
    { label: '(UTC+05:30) India Standard Time', value: 'Asia/Kolkata' },
    { label: '(UTC+08:00) Beijing, Hong Kong', value: 'Asia/Shanghai' },
    { label: '(UTC+09:00) Tokyo, Seoul', value: 'Asia/Tokyo' },
    { label: '(UTC+10:00) Sydney, Melbourne', value: 'Australia/Sydney' }
  ];

  @Input() initialTimezone: string = '';
  @Output() timezoneChange = new EventEmitter<string>();
  @Input() label: string = 'Selecione o Fuso Horário';
  selectedTimezone: string = '';

  ngOnInit() {
    this.selectedTimezone = this.initialTimezone;
  }

  onTimezoneChange() {
    this.timezoneChange.emit(this.selectedTimezone);
  }
}
