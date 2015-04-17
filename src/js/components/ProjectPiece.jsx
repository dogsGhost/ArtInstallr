const React = require('react');

const ProjectPiece = React.createClass({
  render() {
    return (
      <li key={this.props.key}>
        {this.props.piece.title}
        <a href="#" className="btn btn-link disabled" onClick={this.props.onEdit}>Edit</a>
        <a href="#" className="btn btn-link" onClick={this.props.onDestroy}>Remove</a>
      </li>
    );
  }
});

module.exports = ProjectPiece;