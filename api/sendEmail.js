import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  // CORS başlıkları
  res.setHeader('Access-Control-Allow-Origin', 'https://ozkanbulut.vercel.app'); // frontend adresini kendi domaininle değiştir
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight OPTIONS isteğine hızlı cevap
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { name, email, message },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('EmailJS send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
