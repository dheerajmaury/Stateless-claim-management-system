const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB=require('./config/ database')

const policyholderRoutes = require('./routes/policyholderRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/policyholders', policyholderRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/claims', claimRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
