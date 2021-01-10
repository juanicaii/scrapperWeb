import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Form from '../components/FormComponent'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Scrapping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Form/>
    </div>
  )
}
