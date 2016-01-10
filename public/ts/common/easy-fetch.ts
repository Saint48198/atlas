
declare var fetch;
const MAX_WAITING_TIME: Number = 5000;

export class EasyFetch {
  options: {};

  constructor() {}

  processStatus (response) {
    // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
    if (response.status === 200 || response.status === 0) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  parseJson (response) {
    return response.json();
  }

  getWrappedPromise() {
    var wrappedPromise = {},
        promise = new Promise(function (resolve, reject) {
          wrappedPromise['resolve'] = resolve;
          wrappedPromise['reject'] = reject;
        });

    wrappedPromise['then'] = promise.then.bind(promise);
    wrappedPromise['catch'] = promise.catch.bind(promise);
    wrappedPromise['promise'] = promise;// e.g. if you want to provide somewhere only promise, without .resolve/.reject/.catch methods

    return wrappedPromise;
  }

  getWrappedFetch(url:String, options:Object) {
    var wrappedPromise = this.getWrappedPromise();
    var args = Array.prototype.slice.call(arguments);// arguments to Array

    fetch.apply(null, args)// calling original fetch() method
      .then(function (response) {
        wrappedPromise['resolve'](response);
      }, function (error) {
        wrappedPromise['reject'](error);
      })
      .catch(function (error) {
        wrappedPromise['catch'](error);
      });
    return wrappedPromise;
  }

  getJSON(params: Object) {
    let url = params['url'];
    if (params['url'].split('?').length && params['cacheBusting']) {
      url = params['url'] + '&' + new Date().getTime();
    } else if (!params['url'].split('?').length && params['cacheBusting']) {
      url = params['url'] + '?' + new Date().getTime();
    }

    var wrappedFetch = this.getWrappedFetch(
      url,
      {
        method: 'GET',// optional, "GET" is default value
        headers: {
          'Accept': 'application/json'
        }
      });

    var timeoutId = setTimeout(function () {
      wrappedFetch['reject'](new Error('Load timeout for resource: ' + params['url']));// reject on timeout
    }, MAX_WAITING_TIME);

    return wrappedFetch['promise']// getting clear promise from wrapped
      .then(function (response) {
        clearTimeout(timeoutId);
        return response;
      })
      .then(this.processStatus)
      .then(this.parseJson);
  }
}
