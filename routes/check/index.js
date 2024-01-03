import express from 'express';
const router = express.Router();

import health from '@cloudnative/health-connect';
const healthCheck = new health.HealthChecker();
const pingCheck = new health.PingCheck('google.com');
healthCheck.registerReadinessCheck(pingCheck);

module.exports = (params) => {

  router.get('/live', health.LivenessEndpoint(healthCheck));
  router.get('/ready', health.ReadinessEndpoint(healthCheck));

  return router;
};