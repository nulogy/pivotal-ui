/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.FormUnit = undefined;

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

var _tooltip = require('../tooltip');

var _iconography = require('../iconography');

var _flexGrids = require('../flex-grids');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormUnit = exports.FormUnit = function (_React$Component) {
  (0, _inherits3.default)(FormUnit, _React$Component);

  function FormUnit() {
    (0, _classCallCheck3.default)(this, FormUnit);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  FormUnit.prototype.componentDidMount = function componentDidMount() {
    require('../../css/forms');
  };

  FormUnit.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        hideHelpRow = _props.hideHelpRow,
        retainLabelHeight = _props.retainLabelHeight,
        inline = _props.inline,
        label = _props.label,
        labelClassName = _props.labelClassName,
        labelPosition = _props.labelPosition,
        optional = _props.optional,
        optionalText = _props.optionalText,
        tooltip = _props.tooltip,
        _props$tooltipSize = _props.tooltipSize,
        tooltipSize = _props$tooltipSize === undefined ? 'lg' : _props$tooltipSize,
        _props$tooltipPlaceme = _props.tooltipPlacement,
        tooltipPlacement = _props$tooltipPlaceme === undefined ? 'top' : _props$tooltipPlaceme,
        field = _props.field,
        help = _props.help,
        hasError = _props.hasError,
        labelFor = _props.labelFor,
        postLabel = _props.postLabel,
        state = _props.state,
        setState = _props.setState,
        fieldRowClassName = _props.fieldRowClassName,
        labelRowClassName = _props.labelRowClassName;


    if (!label && !field && !help) return null;

    var tooltipIcon = tooltip && _react2.default.createElement(
      _tooltip.TooltipTrigger,
      { tooltip: tooltip, className: 'pui-tooltip-light', size: tooltipSize, placement: tooltipPlacement },
      _react2.default.createElement(_iconography.Icon, { verticalAlign: 'baseline', src: 'info_outline' })
    );

    var labelElement = _react2.default.createElement(
      'label',
      { className: labelClassName, htmlFor: labelFor },
      label,
      tooltipIcon,
      label && optional && _react2.default.createElement(
        'span',
        {
          className: 'optional-text type-neutral-4' },
        optionalText || optionalText === '' ? optionalText : '(Optional)'
      )
    );

    var labelRow = (label || retainLabelHeight || postLabel) && (inline ? labelElement : _react2.default.createElement(
      _flexGrids.Grid,
      { key: 'label-row', className: (0, _classnames3.default)('label-row', labelRowClassName), gutter: false },
      _react2.default.createElement(
        _flexGrids.FlexCol,
        null,
        labelElement
      ),
      _react2.default.createElement(
        _flexGrids.FlexCol,
        { fixed: true, contentAlignment: 'middle', className: 'post-label' },
        typeof postLabel === 'function' ? postLabel({ state: state, setState: setState }) : postLabel
      )
    ));

    var fieldRow = field && (inline ? field : _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)('field-row', fieldRowClassName), key: 'field-row' },
      field
    ));
    var helpRowClassName = (0, _classnames3.default)('help-row', { 'type-dark-5': !hasError });
    var helpRow = inline ? help : _react2.default.createElement(
      'div',
      { className: helpRowClassName, key: 'help-row' },
      help
    );

    var sections = labelPosition === 'after' ? [fieldRow, labelRow] : [labelRow, fieldRow];

    var content = inline ? [_react2.default.createElement(
      _flexGrids.Grid,
      { className: 'grid-inline', key: 'top' },
      sections.map(function (col, key) {
        var _classnames;

        return _react2.default.createElement(
          _flexGrids.FlexCol,
          {
            key: key,
            fixed: key === 0,
            className: (0, _classnames3.default)((_classnames = {}, _classnames[(0, _classnames3.default)('label-row', labelRowClassName)] = key === 0 && labelPosition !== 'after' || key === 1 && labelPosition === 'after', _classnames[(0, _classnames3.default)('field-row', fieldRowClassName)] = key === 0 && labelPosition === 'after' || key === 1 && labelPosition !== 'after', _classnames))
          },
          col
        );
      })
    )] : sections;

    if (!hideHelpRow) {
      if (inline) {
        content.push(_react2.default.createElement(
          _flexGrids.Grid,
          { key: 'bottom' },
          _react2.default.createElement(
            _flexGrids.FlexCol,
            { className: helpRowClassName },
            helpRow
          )
        ));
      } else {
        content.push(helpRow);
      }
    }

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames3.default)('form-unit', className, { 'has-error': hasError, 'inline-form-unit': inline }) },
      content
    );
  };

  return FormUnit;
}(_react2.default.Component);

FormUnit.propTypes = {
  className: _propTypes2.default.string,
  inline: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  labelClassName: _propTypes2.default.string,
  labelFor: _propTypes2.default.string,
  postLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
  hideHelpRow: _propTypes2.default.bool,
  retainLabelHeight: _propTypes2.default.bool,
  labelPosition: _propTypes2.default.oneOf(['after']),
  optional: _propTypes2.default.bool,
  optionalText: _propTypes2.default.string,
  tooltip: _propTypes2.default.node,
  tooltipSize: _propTypes2.default.oneOf(['sm', 'md', 'lg']),
  tooltipPlacement: _propTypes2.default.oneOf(['left', 'right', 'bottom', 'top']),
  field: _propTypes2.default.node,
  help: _propTypes2.default.node,
  hasError: _propTypes2.default.bool,
  state: _propTypes2.default.object,
  setState: _propTypes2.default.func,
  fieldRowClassName: _propTypes2.default.string,
  labelRowClassName: _propTypes2.default.string
};