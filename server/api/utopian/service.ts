import * as request from 'request';
const RETRIEVE_PROJECTS_URL = `https://utopian.rocks/api/posts?status=pending`;

export function retrievePendingPosts(SCZAccessToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    request.get({
      url: RETRIEVE_PROJECTS_URL,
      headers: { SCZAccessToken },
      json: true
    }, (error, response, body) => {
      if (error !== null) {
        return reject(error);
      }
      resolve(body);
    });
  });
}
