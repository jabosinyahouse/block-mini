import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="border-black/ container mx-auto flex h-[10vh] items-center justify-between border-b">
        <Link href="/">
          <a className="text-2xl text-neutral-100">LOGICST</a>
        </Link>
        <div className="">
          {/* <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
            <li>
              <Link href="/contract">
                <a className="">Contract</a>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <a className="">User</a>
              </Link>
            </li>
            <li>
              <Link href="/merchant">
                <a className="">Merchant</a>
              </Link>
            </li>
            <li>
              <Link href="/logistic">
                <a className="">Logistic</a>
              </Link>
            </li>
          </ul> */}
          <button className="rounded-md border-2 border-neutral-400 px-2 py-1 text-xs font-bold uppercase text-neutral-200">
            Connect to Metamask
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
