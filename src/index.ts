import * as dotenv from 'dotenv';
dotenv.config();

import config from './config';
import app from './server';

const PORT = config.port || 3999;

app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
});