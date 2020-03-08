// @flow

import express from 'express';
import type { Router, $Request, $Response } from 'express';
import fetch from 'node-fetch';

export default function componentRouter() {
  const router: Router<> = express.Router();
  const sendDeploymentIntentionRequest = async (req: $Request, res: $Response) => {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }

    const url = 'http://v9_dep_mgr.patcody.io:81/api/set_deployment_intention';
    const body = {
      id: {
        user: req.user.username,
        repo: req.body.componentName
      },
      new_deployment_intention: req.body.deploymentIntention
    };

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.log('Did not successfully update component deployment intention');
    }

    res.sendStatus(200);
  };

  router.post('/sendDeploymentIntention', (req, res) => sendDeploymentIntentionRequest(req, res));

  return router;
}
