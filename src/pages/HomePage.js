import {
  Page,
  Navbar,
  Toolbar,
  Link,
  Block,
  Button,
  f7,
  useStore,
} from "framework7-react";

const HomePage = ({ f7router }) => {
  const count = useStore("count");

  return (
    <>
      {/*  Initial Page */}
      <Page>
        {/* Top Navbar */}
        <Navbar title="Awesome App">
          <Link slot="left">Left</Link>
          <Link slot="right">Right</Link>
        </Navbar>
        {/* Toolbar */}
        <Toolbar bottom>
          <Link>Link 1</Link>
          <Link>Link 2</Link>
        </Toolbar>
        {/* Page Content */}
        {/* <Block>
          <p>Page content goes here</p>
          <Link href="/about/">Link to About App</Link>
        </Block>
        <Block>
          <Button fill href="/article/1/">
            Go to Article ID:
          </Button>
        </Block> */}

        {/* Send Button sample */}
        {/* <Block>
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
        </Block> */}

        {/* useStore sample */}
        {/* <Block>
          <p>Count: {count}</p>
          <Button
            fill
            onClick={() => {
              // clicked the value of count increse
              f7.store.dispatch("setCount", count + 1);
            }}
          >
            Increment
          </Button>
        </Block> */}

        <Block>
          <p>Go to Message Page</p>
          <Button fill href="/message/">
            Click to Meesage Page
          </Button>
        </Block>
      </Page>
    </>
  );
};

export default HomePage;
