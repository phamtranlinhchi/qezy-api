import fs from 'fs';
import path from "path";
export const deleteFiles = (directory: string, extension: string) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    files.forEach(file => {
      if (path.extname(file) === extension) {
        fs.unlink(path.join(directory, file), err => {
          if (err) {
            console.error(`Error deleting file: ${err}`);
          } else {
            console.log(`Deleted file: ${file}`);
          }
        });
      }
    });
  });
};


export function formatDateTime(value: Date): string {
  const miningDate = new Date(value);
  const year = miningDate.getFullYear();
  const month = (miningDate.getMonth() + 1).toString().padStart(2, '0');
  const day = miningDate.getDate().toString().padStart(2, '0'); 
  const hours = miningDate.getHours().toString().padStart(2, '0'); 
  const minutes = miningDate.getMinutes().toString().padStart(2, '0'); 
  const seconds = miningDate.getSeconds().toString().padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  return formattedDateTime;
}