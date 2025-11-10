// @ts-check
import express from 'express';
import {apiReference} from '@scalar/express-api-reference';
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

// Mount Scalar API Reference at /api-docs
app.use(
	'/api-docs',
	apiReference({
		spec: {
			url: '/api-docs.json',
		},
		theme: 'dark',
		title: 'Engrave Protocol API',
		defaultHttpClient: {
			targetKey: 'javascript',
		},
	}),
);

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
