const test = require('tape')
const detectNetwork = require('../')
const Web3 = require('web3')
const tc = require('truffle-contract')

test('detect network', async (t) => {
  t.plan(4)

  const contract = tc()

  const providerUrl = 'https://rinkeby.infura.io:443'

  const net_1 = await detectNetwork()
  t.equal(net_1.id, null)
  t.equal(net_1.type, 'unknown')

  const provider = new Web3.providers.HttpProvider(providerUrl)
  contract.setProvider(provider)

  const net_2 = await detectNetwork(provider)
  t.equal(net_2.id, 4)
  t.equal(net_2.type, 'rinkeby')
})

test('detect websocket network', async (t) => {
  t.plan(2)

  const contract = tc()

  const providerUrl = 'wss://rinkeby.infura.io/ws'

  const provider = new Web3.providers.HttpProvider(providerUrl)
  contract.setProvider(provider)

  const net_2 = await detectNetwork(provider)
  t.equal(net_2.id, 4)
  t.equal(net_2.type, 'rinkeby')
})
