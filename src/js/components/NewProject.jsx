const React = require('react');
const utils = require('./../utils');
const ProjectPiece = require('./ProjectPiece.jsx');
const ProjectCanvas = require('./ProjectCanvas.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {
      // Start with an empty collection.
        pieces: []
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
      title: titleField.value || 'Piece ' + (this.state.pieces.length + 1),
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
        pieces: this.state.pieces.concat(piece)
      });
    } else {
      // TODO: form validation error message
      console.log('form incomplete');
    }

    // Drop focus from the submit button.
    React.findDOMNode(this.refs.newPieceFormSubmit).blur();
  },

  // Remove a piece from the collection.
  destroy(piece) {
    this.setState({
      pieces: this.state.pieces.filter((value) => value !== piece)
    });
  },

  edit(e) {
    // TODO: Edit a piece already present in the collection.
  },

  reorder(pieces, dragging) {
    this.dragging = dragging;
    this.setState({
      pieces: pieces
    });
  },

  dragStart(e) {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';

    // Fix for Firefox.
    e.dataTransfer.setData('text/html', null);
  },

  dragEnd() {
    // Update state.
    this.reorder(this.state.pieces, undefined);
  },

  dragOver(e) {
    e.preventDefault();
    var over = e.currentTarget;
    var from = isFinite(this.dragging) ? this.dragging : this.dragged;
    var to = Number(over.dataset.id);
    if ((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    if (from < to) to--;

    // Move from 'a' to 'b'
    var pieces = this.state.pieces;
    pieces.splice(to, 0, pieces.splice(from, 1)[0]);
    this.reorder(pieces, to);
  },

  render() {
    var len = this.state.pieces.length;
    // Build list of projects to display.
    var projectPieces = this.state.pieces.map((piece, index) => {
      // Only make draggable if there's more than 1 piece in the collection.
      if (len > 1) {
        return (
          <ProjectPiece
            dragging={this.dragging}
            key={index}
            index={index}
            onDestroy={this.destroy}
            onEdit={this.edit}
            canDrag='true'
            onDragStart={this.dragStart}
            onDragEnd={this.dragEnd}
            onDragOver={this.dragOver}
            piece={piece} />
        );
      }

      return (
        <ProjectPiece
          key={index}
          index={index}
          onDestroy={this.destroy.bind(this, piece)}
          onEdit={this.edit}
          piece={piece} />
      );
    });

    return (
      <div>
        {
          len ?
            <ul className="projectList list-unstyled">
              {projectPieces}
            </ul> :
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
          len ?
            <ProjectCanvas settings={this.props.settings} collection={this.state.pieces} /> :
            false
        }
      </div>
    );
  }
});