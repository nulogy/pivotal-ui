/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.Dropdown = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mixins = require('../mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _scrim_mixin = require('../mixins/mixins/scrim_mixin');

var _scrim_mixin2 = _interopRequireDefault(_scrim_mixin);

var _transition_mixin = require('../mixins/mixins/transition_mixin');

var _transition_mixin2 = _interopRequireDefault(_transition_mixin);

var _iconography = require('../iconography');

var _flexGrids = require('../flex-grids');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultToggleNode = function defaultToggleNode(showIcon, icon, onClick, size, title, className, ariaLabel) {
  return _react2.default.createElement(
    'button',
    {
      type: 'button',
      className: className,
      onClick: onClick,
      'aria-haspopup': true,
      'aria-label': ariaLabel
    },
    title,
    showIcon && _react2.default.createElement(_iconography.Icon, { src: icon, className: 'icon-toggle' })
  );
};

var Dropdown = exports.Dropdown = function (_mixin$with) {
  (0, _inherits3.default)(Dropdown, _mixin$with);

  function Dropdown(props, context) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin$with.call(this, props, context));

    _this.click = function (event) {
      _this.setState({ open: !_this.state.open });
      _this.props.onClick && _this.props.onClick(event);
    };

    _this.scrimClick = function () {
      return _this.setState({ open: false });
    };

    _this.menuClick = function () {
      if (!_this.props.closeOnMenuClick) return;
      _this.setState({ open: false });
    };

    _this.state = {
      open: false
    };

    _this.click = _this.click.bind(_this);
    return _this;
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    _mixin$with.prototype.componentDidMount.call(this);
    require('../../css/dropdowns');
  };

  Dropdown.prototype.render = function render() {
    var _props = this.props,
        closeOnMenuClick = _props.closeOnMenuClick,
        onClick = _props.onClick,
        onEntered = _props.onEntered,
        onExited = _props.onExited,
        blockingScrim = _props.blockingScrim,
        border = _props.border,
        buttonAriaLabel = _props.buttonAriaLabel,
        buttonClassName = _props.buttonClassName,
        children = _props.children,
        className = _props.className,
        disableScrim = _props.disableScrim,
        showIcon = _props.showIcon,
        flat = _props.flat,
        link = _props.link,
        menuAlign = _props.menuAlign,
        size = _props.size,
        icon = _props.icon,
        split = _props.split,
        title = _props.title,
        toggle = _props.toggle,
        floatMenu = _props.floatMenu,
        scroll = _props.scroll,
        itemClassName = _props.itemClassName,
        props = (0, _objectWithoutProperties3.default)(_props, ['closeOnMenuClick', 'onClick', 'onEntered', 'onExited', 'blockingScrim', 'border', 'buttonAriaLabel', 'buttonClassName', 'children', 'className', 'disableScrim', 'showIcon', 'flat', 'link', 'menuAlign', 'size', 'icon', 'split', 'title', 'toggle', 'floatMenu', 'scroll', 'itemClassName']);
    var open = this.state.open;

    var buttonStyleClasses = (0, _classnames2.default)('dropdown-toggle', buttonClassName);
    var noTitle = typeof title === 'undefined' || title === null || title.length === 0;

    var forceIcon = noTitle || split;
    var iconVisible = forceIcon || showIcon;
    var toggleNode = toggle ? toggle : defaultToggleNode(iconVisible, icon, this.click, size, !split && title, buttonStyleClasses, buttonAriaLabel);
    var menuVisibility = open ? 'dropdown-open' : 'dropdown-closed';

    var dropdownClasses = (0, _classnames2.default)('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-link': link,
      'dropdown-lg': size === 'large',
      'dropdown-sm': size === 'small',
      'dropdown-icon-only': !split && noTitle
    }, menuVisibility, className);

    var dropdownMenuClasses = (0, _classnames2.default)('dropdown-menu', {
      'dropdown-border': border,
      'dropdown-menu-right': menuAlign === 'right',
      'dropdown-menu-left': menuAlign === 'left',
      'dropdown-menu-float': split || flat || link || floatMenu || noTitle || menuAlign !== 'none',
      'dropdown-menu-scroll': scroll
    });
    var dropdownOptions = _react2.default.createElement(
      'div',
      { className: dropdownMenuClasses },
      _react2.default.createElement(
        'ul',
        { 'aria-label': 'submenu', onClick: this.menuClick },
        _react2.default.Children.map(children, function (child) {
          return child ? _react2.default.createElement(
            'li',
            { className: itemClassName },
            child
          ) : null;
        })
      )
    );

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({ className: dropdownClasses }, props),
      split ? _react2.default.createElement(
        _flexGrids.Grid,
        { gutter: false },
        _react2.default.createElement(
          _flexGrids.FlexCol,
          { className: 'dropdown-label' },
          title
        ),
        _react2.default.createElement(
          _flexGrids.FlexCol,
          { fixed: true, className: 'dropdown-icon-col col-middle' },
          toggleNode
        )
      ) : toggleNode,
      blockingScrim && open && !disableScrim && _react2.default.createElement('div', { className: 'scrim', onClick: this.scrimClick }),
      dropdownOptions
    );
  };

  return Dropdown;
}((0, _mixins2.default)(_react2.default.Component).with(_scrim_mixin2.default, _transition_mixin2.default));

Dropdown.propTypes = {
  blockingScrim: _propTypes2.default.bool,
  border: _propTypes2.default.bool,
  buttonAriaLabel: _propTypes2.default.string,
  buttonClassName: _propTypes2.default.string,
  closeOnMenuClick: _propTypes2.default.bool,
  disableScrim: _propTypes2.default.bool,
  flat: _propTypes2.default.bool,
  floatMenu: _propTypes2.default.bool,
  icon: _propTypes2.default.string,
  itemClassName: _propTypes2.default.string,
  link: _propTypes2.default.bool,
  menuAlign: _propTypes2.default.oneOf(['none', 'left', 'right']),
  onClick: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  onExited: _propTypes2.default.func,
  title: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  toggle: _propTypes2.default.node,
  scroll: _propTypes2.default.bool,
  showIcon: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['normal', 'large', 'small']),
  split: _propTypes2.default.bool
};
Dropdown.defaultProps = {
  blockingScrim: false,
  closeOnMenuClick: true,
  disableScrim: false,
  icon: 'chevron_down',
  menuAlign: 'none',
  scroll: false,
  showIcon: true,
  size: 'normal'
};