import Head from "next/head";
import { Children } from "react";
import styles from "./layout.module.css"
import utilsStyles from "../styles/utils.module.css"
import Link from "next/link";

const name = "Take Code"
export const siteTitle = "Next.js blog"

export function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.icon" />
            </Head>
            {/* 三項演算子でhtmlに分岐を加える。HTMLの中でjsを記述する場合は{}、jsの中でhtmlを記述する場合は()を使用する */}
            {home ? (
                <>
                    <img
                        src="images/profile.png" className={`${utilsStyles.borderCircle} ${styles.headerHomeImage}`}
                    />
                    <h1 className={utilsStyles.heading2Xl}>{name}</h1>
                </>
            ) : (
                <>
                    <img
                        src="images/profile.png" className={`${utilsStyles.borderCircle}`}
                    />
                    <h1 className={utilsStyles.heading2Xl}>{name}</h1>
                </>
            )}
            <header className={styles.header}>

            </header>
            <main>
                {children}
            </main>
            {!home && (
                <Link href="/">←ホームへ戻る</Link>
            )}
        </div>
    );
}