'use strict';

/**
 * TODO: use actual smart contracts and genesis blocks
 * to detect network.
 */

var pify = require('bluebird').promisify;
var parseDomain = require('parse-domain');

var networksTypes = {
  1: 'main',
  2: 'morden',
  3: 'ropsten',
  42: 'kovan',
  4: 'rinkeby'
};

var networksIds = {
  main: 1,
  mainnet: 1,
  morden: 2,
  ropsten: 3,
  kovan: 42,
  rinkeby: 4
};

function detectNetwork(provider) {
  var netId, _parseDomain, subdomain, domain, tld, type, _test, _test2, _test3;

  return Promise.resolve().then(function () {
    netId = null;
    _test = provider instanceof Object;
    // MetamaskInpageProvider

    if (_test && provider.publicConfigStore && provider.publicConfigStore._state && provider.publicConfigStore._state.networkVersion) {
      netId = provider.publicConfigStore._state.networkVersion;

      // Web3.providers.HttpProvider
    } else {
      if (_test) {
        if (provider.host) {
          _parseDomain = parseDomain(provider.host);
          subdomain = _parseDomain.subdomain;
          domain = _parseDomain.domain;
          tld = _parseDomain.tld;


          if (domain === 'infura' && tld === 'io') {
            netId = networksIds[subdomain];
          }
        }
      }

      _test2 = typeof window !== 'undefined' && window.web3;
      // web3.js v<1.0

      if (_test2 && web3.version && web3.version.getNetwork) {
        return Promise.resolve().then(function () {
          return pify(web3.version.getNetwork)();
        }).then(function (_resp) {
          netId = _resp;

          // web3.js v1.0+
        });
      } else {
        _test3 = _test2;
        if (_test3 && web3.eth && web3.eth.net && web3.eth.net.getId) {
          return Promise.resolve().then(function () {
            return pify(web3.eth.net.getId)();
          }).then(function (_resp) {
            netId = _resp;
          });
        }
      }
    }
  }).then(function () {

    if (netId === undefined) {
      netId = null;
    }

    type = networksTypes[netId] || 'unknown';


    return {
      id: netId,
      type: type
    };
  });
}

module.exports = detectNetwork;

