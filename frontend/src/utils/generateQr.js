// Removed unused imports

export const generateQrDataUrl = (text) => {
  // This is a helper if we just needed a raw data URL, 
  // but we are using the qrcode.react component instead in the UI.
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
};
