
import { StreamsFeed } from './_components/streams-feed';
import Head from 'next/head';
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Requiem.tv',
  icons: '/myicon.ico'
}
export default function Home() {


    return (
      <>
      {/* <Head>
        <link rel="icon" href="/myicon.ico" />
        <title>Home Page - My Next.js App</title>
        <meta name="description" content="This is the home page of my Next.js app" />
      </Head> */}
        <div className='h-full p-8 max-w-screen '>
            <StreamsFeed/>
        </div>
      </>
      
    );
}
