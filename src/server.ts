process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception:', err);
  });
  
  import { initServices } from './helpers';
  import { WebServer } from './core/framework';
  import { logger } from './common/shared';
  import { config } from './core/config';
  
  async function startServer() {
    try {
      await initServices();
      const app = WebServer.app;
      app.listen(config.port, () => {
        console.log(`Server running on http://localhost:${config.port}`);
        logger.info(`Server running on http://localhost:${config.port}`);
      });
    } catch (error) {
      console.error(error);
      logger.error('Failed to initialize services', error as any);
    }
  }
  
  startServer();
  