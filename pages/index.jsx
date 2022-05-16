import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import addressShorterner from '../utils/helpers'
import { ABI, ADDRESS, DUMP_PRODUCTS, DUMP_ETH_PRICE } from '../utils/constants'
let logicstContract

const Home = () => {
  const [submitData, setSubmitData] = useState({})
  const [toggleModal, setToggleModal] = useState(false)
  const [orderCounter, setOrderCounter] = useState(0)
  const [contractBalance, setContractBalance] = useState(0)
  const [contractOrderList, setContractOrderList] = useState([])
  const [isMakeTransactionLoading, setIsMakeTransactionLoading] =
    useState(false)
    
  async function getContractBalance() {
    const tx = await logicstContract.getContractBalance()
    setContractBalance(parseFloat(tx, 16))
  }

  async function submitOrderItem() {
    console.log(submitData)
    const tx = await logicstContract.orderItem(
      JSON.stringify(submitData),
      submitData.address,
      {
        value: ethers.utils.parseUnits(
          (DUMP_ETH_PRICE / submitData.unitPrice / 1000).toString(),
          'ether'
        ),
      }
    )
    await tx.wait()
    await getContractBalance()
    await getAllOrderedItem()
  }

  async function getAllOrderedItem() {
    let counter = await logicstContract.orderCounter()
    counter = parseFloat(counter, 16)
    setOrderCounter(() => {
      return counter
    })
    let orderList = []
    for (let i = 0; i < counter; i++) {
      const res = await logicstContract.getOrderByIndex(i)
      console.log(res)
      orderList.push({
        id: parseFloat(res.orderId, 16),
        from: res.from,
        to: res.to,
        item: JSON.parse(res.item),
        state: res.orderState,
        quantity: parseFloat(res.amount, 16),
        atDate: new Date(parseFloat(res.atDate, 16) * 1000),
      })
    }
    const sortedOrder = orderList.sort((a, b) => {
      return b.atDate - a.atDate
    })
    return setContractOrderList(sortedOrder)
  }

  async function connect() {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    let signer = provider.getSigner()
    logicstContract = new ethers.Contract(ADDRESS, ABI, signer)
    console.log('in connect')
    await getContractBalance()
    await getAllOrderedItem()
  }

  useEffect(() => {
    connect()
  }, [])

  return (
    <div className="px-4 pt-4 text-neutral-100 ">
      <Head>
        <title>LOGICST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="static flex justify-center gap-4 pb-8 text-center">
        <div className="relative grid h-[86vh] w-[60vw] grid-rows-6 gap-4">
          <div className="row-span-3 rounded-sm border border-neutral-200 shadow-lg shadow-indigo-500/20">
            <div className="relative row-span-3 mx-10 h-5/6 items-center px-32 ">
              <div className="absolute -top-2 -left-10 rounded-sm border-b border-r bg-indigo-400 px-3 py-1 font-bold tracking-wider text-black/90">
                <p>USER</p>
              </div>
              <h1 className="my-2 text-xl font-bold">offers from tech comp.</h1>
              <div className="container mb-2 h-[34vh] overflow-x-hidden overflow-y-scroll rounded-md border">
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
                    {DUMP_PRODUCTS.map((each, index) => (
                      <tr key={index} className="divide-x divide-neutral-200">
                        <td>
                          <p>{each.fromCop}</p>
                          <p className="text-xs">
                            ({addressShorterner(each.address)})
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
                              className="my-1.5 rounded-md py-0.5 px-0.5 text-sm font-bold text-rose-300 underline underline-offset-2 hover:text-rose-500"
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
                              onClick={() => {
                                setToggleModal(!toggleModal)
                                setSubmitData(() => {
                                  return each
                                })
                              }}
                              className="my-1.5 rounded-md border border-indigo-300 py-1 px-2 text-xs font-bold text-indigo-300 hover:border-indigo-500 hover:text-indigo-500"
                            >
                              Order
                            </button>
                            <div
                              className={`${
                                toggleModal === true ? 'visible' : 'invisible'
                              } absolute top-10 right-0 left-0 z-50`}
                            >
                              <div className="relative flex h-1/5 flex-col items-center p-4 md:h-auto">
                                <div className="relative flex w-4/5 flex-col items-center overflow-x-scroll rounded-lg border bg-black shadow-sm  shadow-indigo-500/50">
                                  <h3 className=" py-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    Order Confirmation
                                  </h3>
                                  <p className="px-20 text-xs">
                                    {JSON.stringify(submitData, null, 2)}
                                  </p>
                                  <div className="flex items-center space-x-4 rounded-b border-gray-200 p-2 dark:border-gray-600">
                                    <button
                                      onClick={async () => {
                                        setIsMakeTransactionLoading(() => {
                                          return true
                                        })
                                        await submitOrderItem()
                                        setToggleModal(() => {
                                          return !toggleModal
                                        })
                                        setIsMakeTransactionLoading(() => {
                                          return false
                                        })
                                      }}
                                      className="my-1.5  flex w-24 justify-center rounded-md border border-indigo-300 py-1.5 text-sm font-bold text-indigo-300 hover:border-indigo-500 hover:text-indigo-500"
                                    >
                                      <svg
                                        className={`${
                                          isMakeTransactionLoading === true
                                            ? 'visible'
                                            : 'invisible'
                                        } absolute left-[18.7rem] top-[8.44rem] h-3 w-3 animate-pulse rounded-full bg-indigo-300`}
                                      ></svg>
                                      {isMakeTransactionLoading === true
                                        ? 'Processing'
                                        : 'Confirm'}
                                    </button>
                                    <button
                                      onClick={() => {
                                        setToggleModal(() => {
                                          return !toggleModal
                                        })
                                        setIsMakeTransactionLoading(() => {
                                          return false
                                        })
                                      }}
                                      className="my-1.5 rounded-md border border-rose-300 py-1.5 px-2 text-sm font-bold text-rose-300 hover:border-rose-500 hover:text-rose-500"
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
          </div>
          <div className="border-neutral-30 relative row-span-3 rounded-sm border">
            <div className="absolute top-0 left-0 rounded-sm border-b border-r bg-rose-500 px-3 py-1 font-bold tracking-wider text-black/90">
              <p>CONTRACT</p>
            </div>
            <div className="flex h-full w-full flex-col">
              <div className="ml-32 flex h-8 items-center justify-between">
                <h1 className="py-1 text-base font-bold">LOG.</h1>
              </div>

              <div className="grid-row-1 grid h-[39.2vh] grid-cols-3 shadow-lg shadow-rose-500/10">
                <div className="col-span-2 overflow-y-scroll border-r border-t pl-1.5 pt-1.5 text-left text-xs">
                  {contractOrderList &&
                    contractOrderList.map((each, index) => (
                      <div key={index}>
                        <div className="flex flex-row">
                          <p className="pr-2 text-indigo-600">{'>>>'}</p>
                          <p className="pr-1.5 text-rose-600">
                            {new Date(each.atDate).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <p className="pr-2 text-indigo-600">{'>>>'}</p>
                          <p className="pr-1.5 text-rose-600">info: </p>
                          <p className="text-neutral-600">
                            {JSON.stringify(each, null, 2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start gap-0.5 pt-4 pl-4 text-left text-xs uppercase tracking-wider">
                  <h1>CONTRACT ADDRESS:</h1>
                  <p className="pl-1.5 font-bold text-rose-600">{ADDRESS}</p>
                  <h1 className="pt-2">CURRENT BALANCE IN: </h1>
                  <p className="pl-1.5 font-bold text-rose-600">
                    WEI: {contractBalance}
                  </p>
                  <p className="pl-1.5 font-bold text-rose-600">
                    ETH: {ethers.utils.formatEther(contractBalance.toString())}
                  </p>
                  <h1 className="pt-2">
                    TOTAL ORDER:{' '}
                    <span className="font-bold text-rose-600">
                      {orderCounter}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
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
