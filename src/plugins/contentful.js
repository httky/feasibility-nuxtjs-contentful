const contentful = require('contentful');
const config = {
  space: 'knrqxmh23ewu',
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  environment: 'master',
  host: process.env.ENV === 'local' ? 'preview.contentful.com' : 'cdn.contentful.com'
};

// https://contentful.github.io/contentful.js/contentful/latest/contentful.html
const client = contentful.createClient(config);

export default client;
