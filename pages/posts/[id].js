import Layout from '../../components/layout'
import Head from 'next/head';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { getAllPostIds, getPostData } from '../../lib/posts'


const Post = ({ postData }) => (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
)

const getStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export { Post as default, getStaticPaths, getStaticProps };


