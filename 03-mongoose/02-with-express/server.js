import express from 'express';
import db from './db.js';
import productRoutes from './routes/product-routes.js';

const app = express();

// JSON middleware
app.use(express.json());

// Mount the routes
app.use('/api/products', productRoutes);

const startServer = async () => {
    const port = process.env.PORT || 4000;

    try {
        await db.connect();
        app.listen(port, ()=> {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log('Could not start server', error);
    }
}

startServer();