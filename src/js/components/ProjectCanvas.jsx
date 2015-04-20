const React = require('react');

module.exports = React.createClass({
  getInitialState() {
    return {
      spacerWidth: this.setSpacerWidth(),
      scaleModifier: this.setScaleModifier()
    }
  },

  componentDidMount() {
    this.renderPieces();
  },

  componentWillUpdate() {
    console.log('updating');
    var canvas = React.findDOMNode(this.refs.installation);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    this.renderPieces();
  },

  // This is used to make sure the installation visual is scaled to fit the viewport.
  setScaleModifier() {
    var w = document.getElementById('app').offsetWidth / this.props.settings.wallDims.width;

    // Round the value down if it's greater than 1.
    return w > 1 ? parseInt(w, 10) : w;
  },

  // getulates how much space should be between each piece.
  setSpacerWidth() {
    var _spacer = 0;

    // Get combined width of all pieces.
    this.props.collection.forEach((el) => _spacer += el.width);

    // Subtract width of pieces from width of wall.
    _spacer = this.props.settings.wallDims.width - _spacer;

    // Divide by number of pieces plus one to account for space after last piece.
    return parseInt(_spacer / (this.props.collection.length + 1), 10);
  },

  // Draw pieces to canvas.
  renderPieces() {
    var canvas = React.findDOMNode(this.refs.installation);
    var _s = this.props.settings;

    // Confirm element is canvas element.
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#777';
console.log('rendering', this.props.collection);
      // Loop through collection and draw piece to canvas.
      this.props.collection.forEach((piece, index) => {
        let h = piece.height * this.state.scaleModifier;
        let w = piece.width * this.state.scaleModifier;
        let y = (_s.wallDims.height - (_s.eyeLevel + (piece.height / 2))) * this.state.scaleModifier;

        // Get left offset.      
        let x = (index + 1) * this.state.spacerWidth;
        // Add widths of all preceeding pieces.
        for (let i = 0; i < index; i++) {
          x += this.props.collection[i].width;
        }
        x = x * this.state.scaleModifier;

        ctx.fillRect(x, y, w, h);
      });
    }
  },

  render() {
    var w = this.props.settings.wallDims.width * this.state.scaleModifier;
    var h = this.props.settings.wallDims.height * this.state.scaleModifier;

    return (
      <div className="installation">
        <canvas ref="installation" className="wallView" width={w} height={h}>
          Sorry, you are using a browser that does not support this feature.
        </canvas>
      </div>
    );
  }
});
