import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import fs from "fs";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); //ファイル名(id)

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        }

    })
    return allPostsData;
}


// getStaticPathでreturnで使うpathを取得する
// Dynamic Routingを使用していて、かつSSGでpre-renderingするページがある場合はgetStaticPathsが必要。
// ビルドの時点でパスをpre-renderingしてくれる。
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
        .use(html)
        .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return{
        id,
        blogContentHTML,
        ...matterResult.data,

    };

}