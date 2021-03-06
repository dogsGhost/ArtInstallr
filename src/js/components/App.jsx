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

  initNewProject(e) {
    e.preventDefault();
    // Calculate settings from input values.
    this.settings = {
      eyeLevel:
        utils.toInches(
          React.findDOMNode(this.refs.eyeLevelFeet).value,
          React.findDOMNode(this.refs.eyeLevelInches).value
        )
    };
    // This lets us change how tall the wall is.
    const _modifier = 0.8;
    this.settings.wallDims = {
      height: parseInt(this.settings.eyeLevel + (this.settings.eyeLevel * _modifier), 10),
      width:
        utils.toInches(
          React.findDOMNode(this.refs.wallWidthFeet).value,
          React.findDOMNode(this.refs.wallWidthInches).value
        )
    };

    // If the values passed were valid render next view.
    if (this.settings.eyeLevel && this.settings.wallDims.width) {
      this.setState({
        projectInitiated: true
      });
    } else {
      // TODO: form validation error message
      console.log('field is missing a value');
    }
  },

  render() {
    // removes initial inputs once fields completed
    if (this.state.projectInitiated) {
      return (
        <NewProject settings={this.settings} />
      );
    }

    return (
      <form className="projectSettings"  onSubmit={this.initNewProject}>
        <p>Measurements can be given in a combination of feet &amp; inches, or just inches.</p>

        <div className="form-row">
          <div className="form-inline">
            <div className="form-group">
              <label htmlFor="eyeLevelFeet">Base eye level</label>
              <div className="input-group input-group--first">
                <input className="form-control input-number" ref="eyeLevelFeet" id="eyeLevelFeet" type="number" min="0" defaultValue="0" />
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
              <label htmlFor="wallWidthFeet">Wall length</label>
              <div className="input-group input-group--first">
                <input className="form-control input-number" ref="wallWidthFeet" id="wallWidthFeet" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">ft</div>
              </div>
              <div className="input-group">
                <input className="form-control input-number" ref="wallWidthInches" type="number" min="0" defaultValue="0" />
                <div className="input-group-addon">in</div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Add Pieces</button>
      </form>
    );
  }
});