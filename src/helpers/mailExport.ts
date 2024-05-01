import { chromium } from 'playwright';
import archiver from 'archiver';
import fs from 'fs';
import { formatDateTime } from "../helpers/changeType";
import { IMail } from "../models/mail.model";

export const exportToPDF = async (htmlContent: string, fileName: string) => {
  let browser;
  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: fileName, format: 'A4' });
  } catch (error) {
    console.error(`Error exporting to PDF: ${error}`);
  } finally {
    if (browser) await browser.close();
  }
};
export const createHtmlContent = async (mail: IMail) => {
  const startDateTime = mail.startDateTime?.dateTime ? formatVietnamTime(mail.startDateTime.dateTime.toString()) : 'Unknown';
  const endDateTime = mail.endDateTime?.dateTime ? formatVietnamTime(mail.endDateTime.dateTime.toString()) : 'Unknown';
  const htmlContent = `
    <html>
     <head>
      <title>${mail.subject || 'No Subject'}</title>
     </head>
     <body>
     <div>
     <p><strong>From:</strong> ${mail.sender?.emailAddress?.name} &lt;${mail.sender?.emailAddress?.address}&gt;</p>
     <p><strong>Sent Date:</strong> ${mail.sentDateTime ? mail.sentDateTime.toLocaleString() : 'Unknown'}</p>
     <p><strong>To:</strong>  ${mail.toRecipients?.map(recipient => recipient.emailAddress?.name + ' &lt;' + recipient.emailAddress?.address + '&gt;').join(', ')}</p>
     <p><strong>Cc:</strong>  ${mail.ccRecipients?.map(recipient => recipient.emailAddress?.name + ' &lt;' + recipient.emailAddress?.address + '&gt;').join(', ')}</p>
     <p><strong>Subject:</strong> ${mail.subject || 'No Subject'}</p>
      </div>
      <br/>
      <br/>
      ${startDateTime === "Unknown" ? "" : `   <div><strong>Start Date Time:</strong> ${startDateTime} </div>
      <div><strong>Start Date Time:</strong> ${endDateTime} </div>
      <div><strong>Location:</strong> ${mail.location?.displayName}</div>`}
      <div>${mail.body?.content}</div>
    </body>
  </html>
  `;
  const pdfFileName = `${mail.sender?.emailAddress?.address}_${formatDateTime(mail.sentDateTime)}_${mail.id}.pdf`;
  await exportToPDF(htmlContent, pdfFileName);
};
export const createZip = async (fileName: string) => {
  try {
    const output = fs.createWriteStream(`${fileName}.zip`);
    const archive = archiver('zip');
    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn(err);
      } else {
        throw err;
      }
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);
    if (fileName.includes("@")) {
      archive.glob(`${fileName}_*.pdf`);
    }
    else {
      archive.glob(`*.pdf`);
    }
    await archive.finalize();
  }
  catch (err) {
    console.log("Error zip file pdf:", err);
  }
};

const formatVietnamTime = (utcTimeString: string): string => {
  const utcTime: Date = new Date(utcTimeString);
  const vnTime: Date = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  };
  return vnTime.toLocaleString('en-US', options);
};