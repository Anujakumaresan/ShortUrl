const QRCode = require('qrcode');

const generateQr = async (text) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    return qrDataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return null;
  }
};

module.exports = generateQr;
