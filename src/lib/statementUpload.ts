// Shared between the StatementUpload client component and /api/upload-statement
// so the browser rejects a file for the same reasons the server would.

export const MAX_STATEMENT_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_STATEMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export function validateStatementFile(file: File): string | null {
  if (file.size > MAX_STATEMENT_SIZE) {
    return 'File too large. Maximum size is 10MB.';
  }

  if (!ALLOWED_STATEMENT_TYPES.includes(file.type)) {
    return 'Invalid file type. Please upload PDF, image, or Excel files.';
  }

  return null;
}
