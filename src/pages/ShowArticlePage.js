import { Page, Navbar, Link, Block, f7ready } from "framework7-react";
import { useEffect } from "react";

const ShowArticlePage = ({ title, body, f7router }) => {
  // 處理重新整理
  // 未能獲取數據的情況
  // 由於透過 f7router.navigate() 傳遞數據的頁面在 URL 中沒有任何可引用的數據，在這一版面重新整理會獲取不到數據。
  // 透過 useEffect() + f7ready()，判斷在載入組件完成後，如未能獲取相關數據，則彈出提示框，並跳轉到上一頁。
  useEffect(() => {
    f7ready((f7) => {
      if (!title || !body) {
        f7.dialog.alert("No article data was provided.", "Error", () => {
          f7router.back();
        });
      }
    });
  }, []);

  return (
    <>
      <Page>
        <Navbar title="Show" backLink="Back"></Navbar>
        <Block>
          {title && body && (
            <>
              <h1>{title}</h1>
              <p>{body}</p>
            </>
          )}

          <Link back>Back</Link>
        </Block>
      </Page>
    </>
  );
};

export default ShowArticlePage;
