import nodemailer from 'nodemailer';
import vars from '../config/vars';
import { IMail, Mail } from '../models/mail.model';
import logger from '../helpers/logger';
import { createHtmlContent, createZip } from '../helpers/mailExport';

const transport = nodemailer.createTransport({
  host: 'smtp.googlemail.com',
  port: 587,
  auth: {
    user: vars.smtp.username,
    pass: vars.smtp.password,
  },
});

const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  const msg = { from, to, subject, html };
  await transport.sendMail(msg);
};

export default {
  sendEmail,
};
