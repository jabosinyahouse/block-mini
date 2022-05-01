import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Contract from '../components/Contract'
import { ethers } from 'ethers'

const items = [
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
    unitPrice: 1899,
  },
]

const ADDRESS = '0x82095c288E40E2131A88D0413143Eb657EbCEf05'

const ABI = [
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
]

const Home = () => {
  let logicstContract

  const [contractBalance, setContractBalance] = useState(0)
  const [toggleModal, setToggleModal] = useState(false)
  const [contractOrderList, setContractOrderList] = useState([])

  useEffect(() => {
    async function connect() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      logicstContract = new ethers.Contract(ADDRESS, ABI, signer)
      getContractBalance()
      getAllOrderedItem()
    }
    connect()
  }, [])

  const getContractBalance = async () => {
    const tx = await logicstContract.getContractBalance()
    setContractBalance(parseFloat(tx, 16))
  }

  const submitOrderItem = async (data, merchantAddress) => {
    const tx = await logicstContract.orderItem(data, merchantAddress, {
      value: ethers.utils.parseEther('0.000000154486'),
    })
    await tx.wait()
    console.log('Order successful!')
    await getContractBalance()
  }

  const getAllOrderedItem = async () => {
    const count = await logicstContract.orderCounter()
    let orderList = []
    for (let i = 0; i < count; i++) {
      const res = await logicstContract.getOrderByIndex(i)
      console.log(res)
      orderList.push({
        id: parseFloat(res.orderId, 16),
        from: res.from,
        to: res.to,
        item: JSON.parse(res.item),
        state: res.orderState,
        quantity: parseFloat(res.amount, 16),
        atDate: new Date(parseFloat(res.at, 16)),
      })
    }
    console.log(orderList)
    // }
    setContractOrderList(orderList)
  }

  return (
    <div className="px-10 pt-8 text-neutral-100">
      <Head>
        <title>LOGICST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-6 flex-col justify-center gap-4 px-10 pb-8 text-center">
        <div className="col-start-2 col-end-6 grid grid-rows-6 gap-4">
          <div className="row-span-4 grid grid-rows-5 rounded-sm border border-neutral-200">
            <div className="relative row-span-3 mx-10 h-5/6 items-center">
              <div className="absolute top-0 -left-10 rounded-sm border-b border-r bg-indigo-500 px-3 py-1 font-bold tracking-wider text-black/90">
                <p>USER</p>
              </div>
              <h1 className="my-2 text-xl font-bold">offers from tech comp.</h1>
              <div className="container h-[29vh] overflow-x-hidden overflow-y-scroll rounded-md border">
                <table className="relative w-full">
                  <thead className="sticky top-0 text-neutral-200">
                    <tr className="divide-neutral-70 sticky top-0 divide-x border-neutral-200 text-xs font-bold">
                      <th className="bg-neutral-700">Comp.</th>
                      <th className="bg-neutral-700">Info</th>
                      <th className="bg-neutral-700">
                        <p>Min</p>
                        <p>Order</p>
                      </th>
                      <th className="bg-neutral-700">Price/Per Unit</th>
                      <th className="bg-neutral-700">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="static divide-y divide-neutral-200">
                    {items.map((each, index) => (
                      <tr key={index} className="divide-x divide-neutral-200">
                        <td>
                          <p>{each.fromCop}</p>
                          <p className="text-xs">
                            ({each.address.slice(0, 5)}....
                            {each.address.slice(-6, -1)})
                          </p>
                          {/* <p>0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</p> */}
                        </td>
                        <td className="flex flex-row items-center justify-between px-6 py-2">
                          <div className="flex flex-col items-start ">
                            <p className="text-sm">
                              <strong>Name:</strong> {each.name}
                            </p>
                            <p className="text-xs">
                              {JSON.stringify(each.options)}
                            </p>
                          </div>
                          <Link href={each.infoUrl}>
                            <a
                              target="_blank"
                              className="my-1.5 rounded-md py-0.5 px-0.5 text-sm font-bold text-neutral-500 underline underline-offset-2 hover:text-indigo-500"
                            >
                              Specs
                            </a>
                          </Link>
                        </td>
                        <td className="text-sm">{each.minOrder}</td>
                        <td className="text-sm font-bold">
                          {/* <s className="ml-1">$329</s> $319 */}$
                          {each.unitPrice}
                        </td>
                        <td className="p-2">
                          <div>
                            <button
                              onClick={() => setToggleModal(!toggleModal)}
                              className="my-1.5 rounded-md border border-neutral-500 py-1 px-2 text-xs font-bold text-neutral-500 hover:border-indigo-500 hover:text-indigo-500"
                            >
                              Order
                            </button>
                            <div
                              className={`${
                                toggleModal === true ? 'visible' : 'invisible'
                              } absolute top-5 right-0 left-0 z-50`}
                            >
                              <div className="relative flex h-1/5 flex-col items-center p-4 md:h-auto">
                                <div className="relative flex w-4/5 flex-col items-center overflow-x-scroll rounded-lg border bg-black shadow-sm  shadow-indigo-500/50">
                                  <h3 className=" py-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    Order Confirmation
                                  </h3>
                                  <p className="px-20 text-xs">
                                    {JSON.stringify(each, null, '\t')}
                                  </p>
                                  <div className="flex items-center space-x-4 rounded-b border-gray-200 p-2 dark:border-gray-600">
                                    <button
                                      onClick={async () =>
                                        await submitOrderItem(
                                          JSON.stringify(each),
                                          each.address
                                        )
                                      }
                                      className="my-1.5 rounded-md border border-neutral-500 py-1.5 px-2 text-sm font-bold text-neutral-500 hover:border-indigo-500 hover:text-indigo-500"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() =>
                                        setToggleModal(!toggleModal)
                                      }
                                      className="my-1.5 rounded-md border border-neutral-500 py-1.5 px-2 text-sm font-bold text-neutral-500 hover:border-rose-500 hover:text-rose-500"
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row-span-2">
              <p>Transaction Hist + Status</p>
            </div>
          </div>
          <Contract
            contractBalance={contractBalance}
            contractOrderList={contractOrderList}
          />
        </div>
        {/* <div className="col-span-1 grid grid-rows-2 gap-4">
          <div className="border-neutral-30 row-span-1 rounded-sm border bg-red-50">
            Merchant
          </div>
          <div className="border-neutral-30 row-span-1 rounded-sm border bg-purple-50">
            Logistic
          </div>
        </div> */}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-4"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
