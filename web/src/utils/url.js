export default (url) => {
  const startWithApi = url.startsWith('/api') || url.startsWith('api');
  const startWithSlash = url.startsWith('/');
  const endsWithSlash = APIURL.endsWith('/'); // eslint-disable-line
  const trimUrl = startWithSlash ? url.substring(1) : url;
  return `${startWithSlash || endsWithSlash ? '' : '/'}${startWithApi ? '' : 'api/'}${trimUrl}`;
};

