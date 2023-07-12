import { Page, Navbar, Link, Block } from "framework7-react";

const ArticlePage = ({ id }) => {
  return (
    <>
      <Page>
        <Navbar title="Article" backLink="Back"></Navbar>
        <Block>
          <p>This is article {id}</p>
          <Link back>Back</Link>
        </Block>
      </Page>
    </>
  );
};

export default ArticlePage;
