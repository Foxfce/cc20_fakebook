import http from 'node:http';
import { Buffer } from 'node:buffer';

const postData = JSON.stringify({
  'msg': 'Hello World!',
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

http.req