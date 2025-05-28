import emailjs from '@emailjs/browser';

const publicKey = process.env.EMAILJS_PUBLIC_KEY!;
const privateKey = process.env.EMAILJS_PRIVATE_KEY!;
const serviceId = process.env.EMAILJS_SERVICE_ID!;
const templateId = process.env.EMAILJS_TEMPLATE_ID!;

if (!publicKey || !privateKey || !serviceId || !templateId) {
  throw new Error('Missing EmailJS environment variables');
}

emailjs.init({
  publicKey,
  privateKey,
});

export const sendEmail = async (templateParams: Record<string, unknown>) => {
  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
};