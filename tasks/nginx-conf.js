/* eslint-disable max-len, quotes, import/no-dynamic-require, no-useless-escape */
const { exec } = require('child_process');
const fs = require('fs');

const { catchError, logger } = require('./functions.js');
const config = require('../config/config.js');

const configNginx = require(`../config/env/${config.ENV}/nginx-conf.json`);
const configWeb = require(`../config/env/${config.API}/config-web.js`);

const file = './nginx.conf';
if (fs.existsSync(file)) { exec(`rm ${file}`, catchError); }
exec(`touch ${file}`, catchError);

const proxies = [
  { port: 5050, pass: configWeb.BACKEND_URL },
];

const nginxProxyContent = proxies.map((proxy) => (`
  server {
    listen         ${proxy.port};
    server_name    localhost;

    location / {
      # Active the proxy
      proxy_set_header          X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header          X-Forwarded-Proto $scheme;
      proxy_pass                ${proxy.pass};
      proxy_redirect            off;
      proxy_buffers             32 16k;
      proxy_busy_buffers_size   64k;
      proxy_hide_header 'access-control-allow-origin';
      proxy_hide_header 'access-control-allow-credentials';

      # Add headers for access control CORS
      add_header    'Access-Control-Allow-Origin' 'http://localhost' always;
      add_header    'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
      add_header    'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Accept-language, x-api-key' always;
      add_header    'Access-Control-Allow-Credentials' 'true' always;
    }
  }
`)).join("\n");

const nginxConfContent = `
${config.ENV === 'localhost' ? 'daemon off;' : ''}

user nginx;
worker_processes ${configNginx.workerProcesses};
pid        /var/run/nginx.pid;

events {
  worker_connections ${configNginx.workerConnections};
}


http {
  include             /etc/nginx/mime.types;
  default_type        application/octet-stream;

  sendfile on;

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';

  keepalive_timeout   65;
  gzip                on;
  gzip_static         on;

  server {
    listen          ${configNginx.port};
    server_name    ${configNginx.serverName};
    ${configNginx.headerXFrameOptions ? `add_header X-Frame-Options "${configNginx.headerXFrameOptions}";` : ''}

    # We don't want users getting the UI via plain HTTP
    if ($http_x_forwarded_proto = 'http') {
      return 301 https://$host$request_uri;
    }

    access_log  ${configNginx.accessLog};
    error_log   ${configNginx.errorLog};

    # Gzip configuration (based on html5 BP)
    gzip              on;
    gzip_comp_level   5;
    gzip_min_length   256;
    gzip_proxied      any;
    gzip_vary         on;
    gzip_types
      application/javascript
      text/css
      text/plain
      image/svg+xml;

    root     /var/app;
    index   index.html;
    auth_basic ${configNginx.authentication};
    auth_basic_user_file /var/app/.htpasswd;

    # Media: images, icons
    # Define cache time rules to 1 days
    location ~* \.(?:jpg|jpeg|gif|png|ico|svg)$ {
      expires         1d;
      add_header      Cache-Control "public, max-age=86400, s-maxage=86400";
    }

    # CSS and Javascript
    # Define cache time rules to 12 hours
    location ~* \.(?:js|css)$ {
      expires         12h;
      add_header      Cache-Control "public, max-age=43200, s-maxage=43200";
    }

    location / {
      try_files       $uri /index.html =404;
    }
  }

  ${configNginx.withProxy ? nginxProxyContent : ''}
}
`;

fs.writeFile(file, nginxConfContent, (err) => {
  if (err) {
    logger.error(`An error occurred while writing the ${file} file`);
    logger.log(err);
  } else {
    logger.success(`File ${file} created with the those parameters`);
    logger.log(`\tenv = ${config.ENV}`);
    logger.log(`\tapi = ${config.API}`);
  }
});
