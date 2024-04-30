const express = require('express');
const qr = require('qr-image');
const app = express();

app.use(express.static('public'));

app.get('/generate-qr', (req, res) => {
    const data = req.query.data;
    if (!data) {
        return res.status(400).send('No data provided');
    }
    try {
        const qr_png = qr.imageSync(data, { type: 'png' });
        const qr_png_base64 = qr_png.toString('base64');
        res.send(qr_png_base64);
    } catch (err) {
        res.status(500).send('Failed to generate QR Code');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
