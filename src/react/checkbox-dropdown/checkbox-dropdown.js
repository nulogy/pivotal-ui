import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from '../dropdowns';
import {Checkbox} from '../checkbox';
import classnames from 'classnames';

function doNothing() {
};

export class CheckboxDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {labels} = this.props;
    const options = labels.reduce((result, item) => {
      result[item] = true;
      return result;
    }, {});
    this.state = {open: false, options};
  }

  componentDidMount() {
    const {onChange} = this.props;
    const {options} = this.state;
    onChange(options);
  }

  static propTypes = {
    buttonAriaLabel: PropTypes.string,
    buttonClassName: PropTypes.string,
    flat: PropTypes.bool,
    labelAriaLabel: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    split: PropTypes.bool,
    labels: PropTypes.array
  };

  static defaultProps = {
    onChange: doNothing,
    size: 'normal'
  };

  getTitle() {
    if (this.allSelected()) return 'ALL';
    const {options} = this.state;
    const selectedOptions = Object.keys(options).filter(key => options[key]).join(', ');
    if (!selectedOptions) return 'NONE';
    return selectedOptions;
  }

  allSelected() {
    const {options} = this.state;
    return Object.values(options).every(val => val);
  }

  toggleAll(e) {
    e.stopPropagation();
    const {options} = this.state;
    const toggledVal = !this.allSelected();
    Object.keys(options).forEach(key => options[key] = toggledVal);
    this.setState({options});
    const {onChange} = this.props;
    onChange(options);
  }

  toggleOption(e, key) {
    e.stopPropagation();
    const {options} = this.state;
    options[key] = !options[key];
    this.setState({options});
    const {onChange} = this.props;
    onChange(options);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {labels, onChange, className, ...dropDownProps} = this.props;
    const {options} = this.state;

    const dropdownItems = labels.map(label => {
      return (
        <Checkbox className="checkbox-dropdown-item-checkbox man"
                  key={label}
                  checked={options[label]}
                  onChange={doNothing}
                  onClick={e => this.toggleOption(e, label)}>{label}</Checkbox>
      );
    });

    const checkBoxAllProps = {
      className: 'all-checkbox man',
      checked: this.allSelected(),
      onClick: e => this.toggleAll(e),
      onChange: doNothing
    };

    const title = <span className="type-ellipsis">{this.getTitle()}</span>;

    return (<Dropdown {...{...dropDownProps, title, className: classnames('checkbox-dropdown', className)}}>
      <span className="checkbox-dropdown-item-checkbox show-all"
          onSelect={e => this.toggleAll(e)}
          checked={this.allSelected()}>
        <Checkbox {...checkBoxAllProps}>ALL</Checkbox>
      </span>
      {dropdownItems}
    </Dropdown>);
  }
}

