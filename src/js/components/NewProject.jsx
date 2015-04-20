const React = require('react');
const utils = require('./../utils');
const ProjectPiece = require('./ProjectPiece.jsx');
const ProjectCanvas = require('./ProjectCanvas.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {
      // Start with an empty collection.
      collection: []
    };
  },

  addPiece(e) {
    e.preventDefault();
    var titleField = React.findDOMNode(this.refs.titleOfPiece);
    var heightFieldFt = React.findDOMNode(this.refs.pieceHeightFt);
    var heightFieldIn = React.findDOMNode(this.refs.pieceHeightIn);
    var widthFieldFt = React.findDOMNode(this.refs.pieceWidthFt);
    var widthFieldIn = React.findDOMNode(this.refs.pieceWidthIn);
    var piece = {
      // Generic fallback title if none is given.
      title: titleField.value || 'Piece ' + (this.state.collection.length + 1),
      height:
        utils.toInches(
          heightFieldFt.value,
          heightFieldIn.value
        ),
      width:
        utils.toInches(
          widthFieldFt.value,
          widthFieldIn.value
        )
    };

    // Add a piece to collection if user values are valid.
    if (piece.height && piece.width) {
      // Reset form fields.
      titleField.value = '';
      heightFieldFt.value = '0';
      heightFieldIn.value = '0';
      widthFieldFt.value = '0';
      widthFieldIn.value = '0';

      this.setState({
        collection: this.state.collection.concat(piece)
      });
    } else {
      // TODO: form validation error message
      console.log('form incomplete');
    }

    // Drop focus from the submit button.
    React.findDOMNode(this.refs.newPieceFormSubmit).blur();
  },

  // Remove a piece from the collection.
  destroy(piece, e) {
    e.preventDefault();
    var _data = this.state.collection.filter((target) => target !== piece);

    this.setState({
      collection: _data
    });
  },

  edit(e) {
    // TODO: Edit a piece already present in the collection.
  },

  render() {
    // Build list of projects to display.
    var projectPieces = this.state.collection.map((piece, index) => {
      return (
        <ProjectPiece
          key={index}
          onDestroy={this.destroy.bind(this, piece)}
          onEdit={this.edit}
          piece={piece} />
      );
    });

    return (
      <div>
        {
          this.state.collection.length ?
            <div className="projectDisplay">
              <ol className="projectList">
                {projectPieces}
              </ol>
            </div> :
            <p><em>No pieces in current project.</em></p>
        }

        <hr />

        <form className="newPieceForm" ref="newPieceForm" onSubmit={this.addPiece}>

          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="titleOfPiece">title of piece</label>
                <input className="form-control" type="text" ref="titleOfPiece" id="titleOfPiece" placeholder="Piece #" />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="pieceHeightFt">height</label>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceHeightFt" id="pieceHeightFt" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceHeightIn" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">in</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label htmlFor="pieceWidthFt">width</label>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceWidthFt" id="pieceWidthFt" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceWidthIn" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">in</div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" ref="newPieceFormSubmit" className="btn btn-primary">Add Piece</button>
        </form>

        {
          this.state.collection.length ?
            <ProjectCanvas settings={this.props.settings} collection={this.state.collection} /> :
            false
        }
      </div>
    );
  }
});