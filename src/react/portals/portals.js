import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

let portalSources = {};
let portalDestinations = {};

export const reset = () => {
  portalSources = {};
  portalDestinations = {};
};

export class PortalSource extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {name} = this.props;
    portalSources[name] = this;
    portalDestinations[name] && this.forceUpdate();
  }

  componentWillUnmount() {
    delete portalSources[this.props.name];
  }

  render() {
    const root = portalDestinations[this.props.name];
    if (!root) return null;
    return ReactDOM.createPortal(this.props.children, root);
  }
}

export class PortalDestination extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {name} = this.props;
    if (name in portalDestinations) {
      console.warn(`Warning: Multiple destination portals with the same name "${name}" detected.`);
    }

    portalDestinations[name] = this.el;
    portalSources[name] && portalSources[name].forceUpdate();
  }

  componentWillUnmount() {
    delete portalDestinations[this.props.name];
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
