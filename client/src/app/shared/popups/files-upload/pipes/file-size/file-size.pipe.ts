import { Pipe, type PipeTransform } from '@angular/core'

const FILE_SIZE_UNITS: string[] = [
  'B',
  'KB',
  'MB',
  'GB',
  'PB',
  'EB',
  'ZB',
  'YB',
];
const FILE_SIZE_UNITS_LONG: string[] = [
  'Bytes',
  'Kilobytes',
  'Megabytes',
  'Gigabytes',
  'Pettabytes',
  'Exabytes',
  'Zettabytes',
  'Yottabytes',
];

@Pipe({
  name: 'appFileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(sizeInBytes: number, longForm?: boolean): string {
    const units: string[] = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    let power: number = Math.round(Math.log(sizeInBytes) / Math.log(1024));

    power = Math.min(power, units.length - 1);

    const size: number = sizeInBytes / Math.pow(1024, power);
    const formattedSize: number = Math.round(size * 100) / 100;
    const unit: string = units[power];

    return size ? `${formattedSize} ${unit}` : '0';
  }
}
