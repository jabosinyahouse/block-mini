export const DUMP_PRODUCTS = [
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'iPad 10.2 (2021)',
    options: [{ capacity: '64GB' }, { color: 'Grey' }],
    infoUrl: 'https://www.apple.com/ipad-10.2/specs',
    minOrder: 100,
    unitPrice: 319,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 189,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
  {
    fromCop: 'Apple Inc.',
    address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    name: 'Macbook Pro (2021) 14"',
    options: [{ capacity: '256GB' }, { color: 'White' }],
    infoUrl: 'https://www.apple.com/macbook-pro-14-and-16/specs/',
    minOrder: 30,
    unitPrice: 1899,
  },
]

export const ABI = [
  {
    inputs: [],
    name: 'getAllOrderedItem',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'item',
            type: 'string',
          },
          {
            internalType: 'enum Logicst.OrderState',
            name: 'orderState',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'atDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Logicst.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getContractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getOrderByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'item',
            type: 'string',
          },
          {
            internalType: 'enum Logicst.OrderState',
            name: 'orderState',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'atDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Logicst.Order',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'orderCounter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'item',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'mAddress',
        type: 'address',
      },
    ],
    name: 'orderItem',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'orderId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'item',
            type: 'string',
          },
          {
            internalType: 'enum Logicst.OrderState',
            name: 'orderState',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'atDate',
            type: 'uint256',
          },
        ],
        internalType: 'struct Logicst.Order',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transferToContract',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const ADDRESS = '0x7C71C87362555808E1D19dB77168E6cC6854FF8a'

export const DUMP_ETH_PRICE = 2807.03
