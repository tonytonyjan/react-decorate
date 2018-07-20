const decorate = require("../src/index");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

test("it will concat className with react component", () => {
  class Foo extends React.Component {
    render() {
      return <h1 className="foo">Foo</h1>;
    }
  }
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(<ExtFoo className="ext-foo" />)
  ).toMatch(/class="foo ext-foo"/);
});

test("it will concat className with functional component", () => {
  const Foo = () => <h1 className="foo">Foo</h1>;
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(<ExtFoo className="ext-foo" />)
  ).toMatch(/class="foo ext-foo"/);
});

test("it will merge style with react component", () => {
  class Foo extends React.Component {
    render() {
      return <h1 style={{ color: "red" }}>Foo</h1>;
    }
  }
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(
      <ExtFoo style={{ backgroundColor: "green" }} />
    )
  ).toMatch(/style="color:red;background-color:green;?"/);
});

test("it will merge style with functional component", () => {
  const Foo = () => <h1 style={{ color: "red" }}>Foo</h1>;
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(
      <ExtFoo style={{ backgroundColor: "green" }} />
    )
  ).toMatch(/style="color:red;background-color:green;?"/);
});

test("it will overwrite style with react component", () => {
  class Foo extends React.Component {
    render() {
      return <h1 style={{ color: "red" }}>Foo</h1>;
    }
  }
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(<ExtFoo style={{ color: "green" }} />)
  ).toMatch(/style="color:green;?"/);
});

test("it will overwrite style with functional component", () => {
  const Foo = () => <h1 style={{ color: "red" }}>Foo</h1>;
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(<ExtFoo style={{ color: "green" }} />)
  ).toMatch(/style="color:green;?"/);
});

test("it will forward props with react component", () => {
  class Foo extends React.Component {
    render() {
      return <h1 style={{ color: "red" }}>Foo</h1>;
    }
  }
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(
      <ExtFoo className="ext-foo" data-bar="bar" />
    )
  ).toMatch(/data-bar="bar"/);
});

test("it will forward props with funtional component", () => {
  const Foo = () => <h1 style={{ color: "red" }}>Foo</h1>;
  const ExtFoo = decorate(Foo);
  expect(
    ReactDOMServer.renderToStaticMarkup(
      <ExtFoo className="ext-foo" data-bar="bar" />
    )
  ).toMatch(/data-bar="bar"/);
});
