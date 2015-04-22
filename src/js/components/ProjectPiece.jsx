const React = require('react');

const ProjectPiece = React.createClass({
  getDefaultProps() {
    return {
      canDrag: 'false',
      onDragStart: function (e) {},
      onDragEnd: function (e) {},
      onDragOver: function (e) {},
    };
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    dragging: React.PropTypes.number,
    onDestroy: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    canDrag: React.PropTypes.string,
    onDragStart: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    onDragOver: React.PropTypes.func,
    piece: React.PropTypes.object.isRequired
  },

  render() {
    var dragging = (this.props.index === this.props.dragging) ? 'dragging' : '';
    var classes = 'projectList-item ' + dragging;
    return (
      <li
        data-id={this.props.index}
        draggable={this.props.canDrag}
        onDragStart={this.props.onDragStart}
        onDragEnd={this.props.onDragEnd}
        onDragOver={this.props.onDragOver}
        className={classes}
      >
        {this.props.draggable === 'true' ? <span className="btn btn-link">&#8597;</span> : false}
        {this.props.index + 1}.&nbsp;
        {this.props.piece.title}
        <a href="#" className="btn btn-link disabled">Details <span className="caret"></span></a>
        <a href="#" className="btn btn-link disabled" onClick={this.props.onEdit}>Edit</a>
        <button type="button" className="close" aria-label="Close" onClick={this.props.onDestroy}><span aria-hidden="true">&times;</span></button>
      </li>
    );
  }
});

module.exports = ProjectPiece;