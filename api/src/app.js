// @ts-check
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {corsMiddleware} from './middleware/cors.js';
import {errorHandler, notFoundHandler} from './middleware/errorHandler.js';
import {swaggerSpec} from './config/swagger.js';
import routes from './routes/index.js';

/**
 * Express Application Setup
 */

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CORS middleware
app.use(corsMiddleware);

// Mount Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
	customCss: '.topbar { display: none; } .swagger-ui { --topbar-bg: #1e1e1e; }',
	customSiteTitle: 'Engrave Protocol API Documentation',
	swaggerOptions: {
		deepLinking: true,
	},
}));

// Mount OpenAPI JSON spec at /api-docs.json
app.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

// Mount all routes
app.use(routes);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
