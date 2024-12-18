import { StringDecoder } from 'string_decoder';
import querystring from 'querystring';

export class BodyParser {
  /**
   * Parsing HTTP request body
   * it can handle data of type ['application/json','application/x-www-form-urlencoded','text/plain']
   * @param {object} req - Node.js native HTTP request object
   * @returns {Promise<any>} Returns the parsed request body data
   */
  public static parse<T>(req): Promise<T> {
    return new Promise((resolve, reject) => {
      if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'PATCH') return resolve(null);
      const contentType = req.headers['content-type'];
      const decoder = new StringDecoder('utf-8');
      let rawData = '';

      req.on('data', (chunk) => (rawData += decoder.write(chunk)));

      req.on('end', () => {
        decoder.end();
        try {
          let parsedData;
          if (contentType.includes('application/json')) {
            parsedData = JSON.parse(rawData);
          } else if (contentType.includes('application/x-www-form-urlencoded')) {
            parsedData = querystring.parse(rawData);
          } else if (contentType.includes('text/plain')) {
            parsedData = rawData;
          } else {
            // Unsupported content type
            return reject(new Error(`Unsupported content type: ${contentType}`));
          }
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      });

      req.on('error', (err) => {
        reject(err);
      });
    });
  }
}
