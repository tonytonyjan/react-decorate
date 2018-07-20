[![Build Status](https://travis-ci.org/tonytonyjan/react-decorate-props.svg?branch=master)](https://travis-ci.org/tonytonyjan/react-decorate-props)

# react-decorate-props

react-decorate-props is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) which can help you concat `className`, merge `style` and forward the rest of props. No more`const {className, style, ...others} = this.props` in `render()`.

# Usage

```jsx
// Instead of...
class Foo extends React.Component {
  render() {
    const { className, style, ...others } = this.props;
    const rootClass = "root";
    const rootStyle = { color: "red", backgroundColor: "green" };
    return (
      <div
        className={[className, rootClass].join(" ")}
        style={Object.merge({}, rootStyle, style)}
        {...others}
      />
    );
  }
}

// ...wrap component with HOC...
import decorate from "react-decorate-props";
class Foo extends React.Component {
  render() {
    const rootClass = "root";
    const rootStyle = { color: "red", backgroundColor: "green" };
    return <div className={rootClass} style={rootStyle} />;
  }
}
export default decorate(Foo);

// ...and in the consuming module...
<Foo
  className="custom"
  style={{ backgroundColor: "black", fontSize: 24 }}
  data-bar="bar"
/>;

// ... HTML output:
// <div
//   class="root custom"
//   style="color:red;background-color:black;font-size:24px"
//   data-bar="bar"
// ></div>

```