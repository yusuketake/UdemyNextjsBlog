// ファイル名を[]でくくってあげることで、ファイル名に変数を指定することができ、任意のURLを埋め込むことができる。
// →動的ルーティング
import Head from 'next/head'
import { Layout } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false, // falseの場合pathに含まれていない他のパスにアクセスすると404ページに飛ばされる。
    }
}

// getStaticPathsはgetStaticPropsと一緒に使わないといけない。
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
    }

}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
            </article>
        </Layout>)
}
