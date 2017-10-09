/**
 * TODO: use actual smart contracts and genesis blocks
 * to detect network.
 */

const pify = require('pify')
const parseDomain = require('parse-domain')

const networksTypes = {
  1: 'main',
  2: 'morden',
  3: 'ropsten',
  42: 'kovan',
  4: 'rinkeby'
}

const networksIds = {
  main: 1,
  mainnet: 1,
  morden: 2,
  ropsten: 3,
  kovan: 42,
  rinkeby: 4
}

async function detectNetwork (provider) {
  const unknownNetwork = {
    id: null,
    type: 'unknown'
  }

  if (typeof provider !== 'object') {
    return unknownNetwork
  }

  let netId = null

  if (
    provider.publicConfigStore &&
    provider.publicConfigStore._state &&
    provider.publicConfigStore._state.networkVersion) {
    netId = provider.publicConfigStore._state.networkVersion
  } else if (provider.host) {
    const {subdomain, domain, tld} = parseDomain(provider.host)

    if (domain === 'infura' && tld === 'io') {
      netId = networksIds[subdomain]
    }
  } else if (window !== undefined && window.web3) {
    if (web3.version && web3.version.getNetwork) {
      netId = await pify(web3.version.getNetwork)()
    } else if (web3.eth && web3.eth.net && web3.eth.net.getId) {
      netId = await pify(web3.eth.net.getId)()
    }
  }

  if (netId === undefined) {
    netId = null
  }

  const type = networksTypes[netId] || 'unknown'

  return {
    id: netId,
    type: type
  }
}

module.exports = detectNetwork
