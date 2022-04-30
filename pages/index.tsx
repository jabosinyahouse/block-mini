import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col py-2">
      <Head>
        <title>LOGICST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid w-full flex-1 grid-cols-2 flex-col justify-center gap-2 px-10 pb-2 text-center">
        <div className="col-span-1 grid grid-rows-6 gap-2">
          <div className="row-span-4 grid grid-rows-5 rounded-sm border-2 border-black/30 bg-yellow-50">
            <div className="row-span-3">
              <h1>Offers</h1>
              <p>Show list of offered order</p>
            </div>
            <div className="row-span-2">
              <p>Transaction Hist + Status</p>
            </div>
          </div>
          <div className="row-span-2 rounded-sm border-2 border-black/30 bg-green-50">
            <h1>Contract</h1>
            <p>show number of account|user</p>
            <p>total transaction (freeze/paid)</p>
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-2">
          <div className="row-span-1 rounded-sm border-2 border-black/30 bg-red-50">
            Merchant
          </div>
          <div className="row-span-1 rounded-sm border-2 border-black/30 bg-purple-50">
            Logistic
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
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
