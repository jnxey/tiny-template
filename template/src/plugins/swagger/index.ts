import { ParamsSource, Model, StatusCode, DataType } from 'node-tiny';
import config from '@/config';
import { swaggerHTML } from '@/plugins/swagger/html';

type SwaggerOptions = { port: number; title?: string; version?: string; description?: string };
function generateSwaggerJSON(apiJSON, options: SwaggerOptions) {
  const swaggerJSON = {
    openapi: '3.0.0',
    info: {
      title: options.title ?? 'Tiny Api',
      version: options.version ?? '1.0.0',
      description: options.description ?? 'Detailed API Documentation'
    },
    servers: [{ url: 'http://localhost:' + options.port, description: 'Development server' }],
    paths: {},
    components: {}
  };
  apiJSON.forEach((item) => {
    if (!swaggerJSON.paths[item.path]) swaggerJSON.paths[item.path] = {};
    let parameters: any[] = [];
    let requestBody: any = null;
    let responseBody: any = null;
    // Request query json
    if (item.requestType === DataType.json && item.paramsInType === ParamsSource.query) {
      Object.keys(item.paramsInModel).forEach((name) => {
        const config = item.paramsInModel[name];
        parameters.push({
          name: name,
          in: item.paramsInType,
          description: config.description,
          required: config.required,
          schema: {
            type: String(config.type)
          }
        });
      });
    }
    // Request body json
    if (item.requestType === DataType.json && item.paramsInType === ParamsSource.body) {
      const map = {};
      const required: string[] = [];
      Object.keys(item.paramsInModel).forEach((name) => {
        const config = item.paramsInModel[name];
        if (config.required) required.push(name);
        map[name] = { type: String(config.type), example: Model.def[config.type] };
      });
      requestBody = {
        [item.requestType]: {
          schema: { type: 'object', properties: map, required: required }
        }
      };
    }
    // Response body json
    if (item.responseType === DataType.json && item.paramsOutModel) {
      const map = {};
      const required: string[] = [];
      Object.keys(item.paramsOutModel).forEach((name) => {
        const config = item.paramsOutModel[name];
        if (config.required) required.push(name);
        map[name] = { type: String(config.type), example: Model.def[config.type] };
      });
      responseBody = {
        [item.responseType]: {
          schema: { type: 'object', properties: map, required: required }
        }
      };
    }

    swaggerJSON.paths[item.path][item.method.toLowerCase()] = {
      tags: [item.module],
      summary: item.summary,
      description: item.summary,
      parameters: parameters,
      requestBody: requestBody && { description: 'Request', required: true, content: requestBody },
      responses: responseBody && {
        '200': { description: 'Response', content: responseBody }
      }
    };
  });
  return swaggerJSON;
}

export function swagger(context, router) {
  if (context.req.url === '/swagger/openapi.json') {
    const json = generateSwaggerJSON(router.apiJSON, { port: config.port });
    context.send(StatusCode.success, JSON.stringify(json), DataType.text);
    return true;
  }
  if (context.req.url === '/swagger.html') {
    const html = swaggerHTML.replace('{ApiUrl}', `http://localhost:${config.port}/swagger/openapi.json`);
    context.send(StatusCode.success, html, DataType.html);
    return true;
  }
  return false;
}
