const React = require('react');
const utils = require('./../utils');
const ProjectPiece = require('./ProjectPiece.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {
      // Start with an empty collection.
      collection: []
    };
  },

  showInstall(e) {
    // TODO: calculate layout of pieces and render view.
    console.log('show install values and visual layout');
  },

  addPiece(e) {
    var titleField = React.findDOMNode(this.refs.titleOfPiece);
    var heightFieldFt = React.findDOMNode(this.refs.pieceHeightFt);
    var heightFieldIn = React.findDOMNode(this.refs.pieceHeightIn);
    var widthFieldFt = React.findDOMNode(this.refs.pieceWidthFt);
    var widthFieldIn = React.findDOMNode(this.refs.pieceWidthIn);
    var piece = {
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
      var _data = this.state.collection.concat(piece);

      // Reset form fields.
      titleField.value = '';
      heightFieldFt.value = '0';
      heightFieldIn.value = '0';
      widthFieldFt.value = '0';
      widthFieldIn.value = '0';

      this.setState({
        collection: _data
      });
    } else {
      // TODO: form validation error message
      console.log('form incomplete');
    }

    e.currentTarget.blur();
  },

  // Remove a piece from the collection.
  destroy(piece, e) {
    e.preventDefault();
    var _data = this.state.collection.filter(function (target) {
      return target !== piece;
    });

    this.setState({
      collection: _data
    });
  },

  edit(e) {
    // TODO: Edit a piece already present in the collection.
  },

  render() {
    // Build list of projects to display.
    var projectPieces = this.state.collection.map(function (piece, index) {
      return (
        <ProjectPiece
          key={index}
          onDestroy={this.destroy.bind(this, piece)}
          onEdit={this.edit}
          piece={piece} />
      );
    }, this);

    return (
      <div>
        {
          this.state.collection.length ?
            <div className="projectDisplay">
            <ol className="projectList">
              {projectPieces}
            </ol>
            <button onClick={this.showInstall} className="btn btn-primary" disabled>Show Installation</button>
          </div> :
          <p><em>No pieces in current project.</em></p>
          
        }
        <hr />
        <div className="newPieceForm" ref="newPieceForm">

          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label>title of piece</label>
                <input className="form-control" type="text" ref="titleOfPiece" />
              </div>
            </div>
          </div>
            
          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label>height</label>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceHeightFt" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceHeightIn" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>                  
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-inline">
              <div className="form-group">
                <label>width</label>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceWidthFt" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>
                <div className="input-group input-group--first">
                  <input className="form-control input-number" ref="pieceWidthIn" type="number" min="0" defaultValue="0" />
                  <div className="input-group-addon">ft</div>
                </div>                  
              </div>
            </div>
          </div>
          <button onClick={this.addPiece} className="btn btn-primary">Add Piece</button>
        </div>

      </div>
    );
  }
});