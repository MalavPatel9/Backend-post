import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageValidator(control: AbstractControl): ValidationErrors | null {
  const file = control.value as File;

  if (file) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // Adjust as needed
    const validMimeType = allowedMimeTypes.includes(file.type);

    if (!validMimeType) {
      return { invalidFileType: true };
    }

    const maxFileSize = 5242880; // 5 MB in bytes, adjust as needed
    if (file.size > maxFileSize) {
      return { fileTooLarge: true };
    }
  }

  return null;
}