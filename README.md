# web3-detect-network

> Detect network from [Web3](https://github.com/ethereum/web3.js/) provider.

# Install

```bash
npm install web3-detect-network
```

# API

- **detectNetwork**(web3Provider) -> Promise({object})

  - {object} web3Provider - Web3 provider object

  Returns an object containing `id` (network ID) and `type` (network name).

# Usage

```javascript
const detectNetwork = require('web3-detect-network')

;(async () => {

const network = await detectNetwork(web3.currentProvider)

console.log(network)
/*
{
  "id": "4",
  "type": "rinkeby"
}
*/
})()
```

# Test

```bash
npm test
```

# License

MIT
