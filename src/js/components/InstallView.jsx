const React = require('react');

module.exports = React.createClass({
  render() {
    var _s = this.props.settings;
    // This is the multiplier for coverting inches to pixels.
    var _m = 6;
    var spacer = this.props.spacer;
    var projectPieces = this.props.collection.map(function (piece, index) {
      var styles = {
        height: (piece.height * _m) + 'px',
        width: (piece.width * _m) + 'px',
        bottom: ((_s.eyeLevel - (piece.height / 2)) * _m) + 'px'
      };

      // get left offset
      var _l = (index + 1) * spacer;
      // Add width of all preceeding pieces.
      for (var i = 0; i < index; i++) {
        _l += this.props.collection[i].width;
      }
      styles.left = (_l * _m) + 'px';

      return (
        <div className="piece" style={styles} key={index}>
          <span className="piece-name">{piece.title}</span>
        </div>
      );
    }, this);

    // Set dimensions for the wall.
    var wallStyles = {
      width: (_s.wallDims.width * _m) + 'px',
      height: (_s.wallDims.height * _m) + 'px'
    };

    return (

      <div className="installation">
        <div className="wallView" style={wallStyles}>
          {projectPieces}
        </div>
      </div>
    );
  }
});