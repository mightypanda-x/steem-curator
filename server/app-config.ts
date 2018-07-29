export const config = {
    env: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL || 'http://steemcurator.com/',
    port: process.env.PORT || 3000,
    ip: process.env.IP || '0.0.0.0',
    pathToClient: process.env.PATH_TO_CLIENT || '/mnt',
    absolutePathToIndexHtml: process.env.ABSOLUTE_PATH_TO_INDEX_HTML || 'http://steemcurator.com'
};

