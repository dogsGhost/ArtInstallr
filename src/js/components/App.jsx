const React = require('react');
const utils = require('./../utils');
const NewProject = require('./NewProject.jsx');

module.exports = React.createClass({
  getInitialState() {
    return {
      // By default there is no project started.
      projectInitiated: false
    };
  },

  handleClick(e) {
    // Calculate settings from input values.
    var settings = {
      eyeLevel:
        utils.toInches(
          React.findDOMNode(this.refs.eyeLevelFeet).value,
          React.findDOMNode(this.refs.eyeLevelInches).value
        )
    };

    settings.wallDims = {
      height: settings.eyeLevel * 2,
      width:
        utils.toInches(
          React.findDOMNode(this.refs.wallWidthFeet).value,
          React.findDOMNode(this.refs.wallWidthInches).value
        )
    };

    // If the values passed were valid render next view.
    if (settings.eyeLevel && settings.wallDims.width) {
      this.setState({
        projectInitiated: true
      });

      React.render(<NewProject settings={settings} />, document.getElementById('app'));
    } else {
      // TODO: form validation error message
      console.log('field is missing a value');
    }
  },

  render() {
    var main;

    // removes initial inputs once fields completed
    if (!this.state.projectInitiated) {
      main =
      <div className="projectSettings">
        <p>Measurements can be given in a combination of feet &amp; inches, or just inches.</p>

        <div className="form-row">
          <div className="form-inline">
            <div className="form-group">
              <label>Base eye level</label>
              <div className="input-group input-group--first">
                <input className="form-control input-number" ref="eyeLevelFeet" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">ft</div>
              </div>
              <div className="input-group">
                <input className="form-control input-number" ref="eyeLevelInches" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">in</div>
              </div>
            </div>
          </div>      
        </div>
        <div className="form-row">
          <div className="form-inline">
            <div className="form-group">
              <label>Wall length</label>
              <div className="input-group input-group--first">
                <input className="form-control input-number" ref="wallWidthFeet" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">ft</div>
              </div>
              <div className="input-group">
                <input className="form-control input-number" ref="wallWidthInches" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">in</div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.handleClick} className="btn btn-primary">Add Pieces</button>
      </div>
    }

    return (
      <div>
        {main}
      </div>
    );
  }
});