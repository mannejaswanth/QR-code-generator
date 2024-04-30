// netlify/functions/generateQR.js
const qr = require('qr-image');

exports.handler = async (event) => {
    const data = event.queryStringParameters.data;
    if (!data) {
        return {
            statusCode: 400,
            body: 'No data provided'
        };
    }
    try {
        const qr_png = qr.imageSync(data, { type: 'png' });
        const qr_png_base64 = qr_png.toString('base64');
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'image/png' },
            body: qr_png_base64,
            isBase64Encoded: true
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Failed to generate QR Code'
        };
    }
};
