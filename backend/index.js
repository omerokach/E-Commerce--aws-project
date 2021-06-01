const express = require('express');
const app = express();
const cors = require("cors")
const purchaseRoute = require('./routes/purchaseRoute')
const productsRoute = require('./routes/productsRoute');
const port = process.env.PORT || 8080
app.use(cors());
app.use(express.json());

app.use('/api/purchase', purchaseRoute);
app.use('/api/products', productsRoute);

app.listen(port, () => {
    console.log('app is running on port', port);
});

