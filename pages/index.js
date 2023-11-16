import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from "next/link"
import { Layout, siteTitle } from '../components/Layout'
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return (
    // homeはprops
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです。
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail },index) => (
            <article key={index}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <span className={utilStyle.boldText}>{title}</span>
              </Link>
              <br />
              <span className={utilStyle.lightText}><small>{date}</small></span>
            </article>
          ))}

        </div>
      </section>
    </Layout>
  )
}
