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
        const qr_png_base64 = Buffer.from(qr_png).toString('base64');
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain' }, // Use 'text/plain' for base64 string
            body: qr_png_base64
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'Failed to generate QR Code'
        };
    }
};
