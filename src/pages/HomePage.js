import { Page, Navbar, Toolbar, Link, Block, Button } from "framework7-react";

const HomePage = ({ f7router }) => {
  return (
    <>
      {/*  Initial Page */}
      <Page>
        {/* Top Navbar */}
        <Navbar title="Awesome App">
          <Link slot="left">Left Link</Link>
          <Link slot="right">Right Link</Link>
        </Navbar>
        {/* Toolbar */}
        <Toolbar bottom>
          <Link>Link 1</Link>
          <Link>Link 2</Link>
        </Toolbar>
        {/* Page Content */}
        <Block>
          <p>Page content goes here</p>
          <Link href="/about/">Link to About App</Link>
        </Block>
        <Block>
          <Button fill href="/article/1/">
            Go to Article ID:
          </Button>
        </Block>

        <Block>
          <Button
            fill
            onClick={() => {
              f7router.navigate("/show/", {
                props: {
                  title: "The Title",
                  body: "This is the body",
                },
              });
            }}
          >
            Send via Navigate API
          </Button>
        </Block>
      </Page>
    </>
  );
};

export default HomePage;
