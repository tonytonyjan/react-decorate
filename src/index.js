const hoistNonReactStatics = require("hoist-non-react-statics");
const React = require("react");

const mergeClassNameAndStyle = (element, ownProps) => {
  const { className = "", style = {} } = ownProps;
  const {
    className: originalClassName = "",
    style: originalStyle = {}
  } = element.props;
  const newClassName = `${originalClassName} ${className}`.replace(
    /^\s|\s$/g,
    ""
  );
  const newStyle = Object.assign({}, originalStyle, style);
  return React.cloneElement(
    element,
    Object.assign({}, element.props, ownProps, {
      style: newStyle,
      className: newClassName === "" ? null : newClassName
    })
  );
};

module.exports = WrappedComponent => {
  if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent)
    return hoistNonReactStatics(
      class extends WrappedComponent {
        render() {
          return mergeClassNameAndStyle(super.render(), this.props);
        }
      },
      WrappedComponent
    );
  else
    return hoistNonReactStatics(
      props => mergeClassNameAndStyle(WrappedComponent(props), props),
      WrappedComponent
    );
};
