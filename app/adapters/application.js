import JSONAPIAdapter from '@ember-data/adapter/json-api';
import config from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';

  // There are likely cleaner ways to do this, but this works.
  //   If test environment, use API mock data from /public/api/
  //   Else, use the Rails-backed API served at localhost:8010
  buildURL(...args) {
    if (config.environment === 'test') return `${super.buildURL(...args)}.json`;

    var uri = 'http://localhost:8010/'+args[0]+'s';
    if(args[1] != null) {uri += '/'+args[1];}
    uri += '.json';
    return uri;
  }
}
