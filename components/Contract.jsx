import React from 'react'

const Contract = ({ contractBalance, contractOrderList }) => {
  return (
    <div className="border-neutral-30 relative row-span-2 rounded-sm border">
      <div className="absolute top-0 left-0 rounded-sm border-b border-r bg-emerald-500 px-3 py-1 font-bold tracking-wider text-black/90">
        <p>CONTRACT</p>
      </div>
      <div className="flex h-full w-full flex-col">
        <div className="ml-32 flex h-1/6 items-center justify-between">
          <h1 className="text-xl font-bold">LOG.</h1>
          <h1 className="mr-4 text-xs uppercase tracking-wider text-emerald-300">
            <strong>CONTRACT ADDRESS: </strong>
            <u>0x5B38...beddC4</u>
          </h1>
        </div>

        <div className="grid h-full grid-cols-3">
          <div className="col-span-2 -mt-1 overflow-auto border p-2 text-left text-xs">
            {contractOrderList.map((each, index) => (
              <div key={index} className="">
                <p>{JSON.stringify(each)}</p>
              </div>
            ))}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <h1>Balances: {contractBalance}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contract
