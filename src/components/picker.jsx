/**
 * Picker
 * The a modal that appears to select a gallery image
 */

import Button     from './ui/button'
import Collection from '../mixins/collection'
import Error      from './error'
import Gallery    from './gallery'
import React      from 'react/addons'
import Search     from './search'
import FocusTrap  from 'react-focus-trap'

let Types = React.PropTypes
let Pure  = React.addons.PureRenderMixin

let Picker = React.createClass({

  mixins: [ Collection, Pure ],

  propTypes: {
    onChange : Types.func.isRequired,
    onExit   : Types.func.isRequired
  },

  getDefaultProps() {
    return {
      items  : [],
      picked : false
    }
  },

  getInitialState() {
    return {
      picked: this.props.picked
    }
  },

  confirm() {
    this.props.onChange(this.state.picked)
    this.props.onExit()
  },

  render() {
    let { error, items, search } = this.state

    return (
      <FocusTrap onExit={ this.props.onExit }>

        <header className="ars-dialog-header">
          <Search key="search" ref="search" datalist={ items } onChange={ this._onSearchChange } />
        </header>

        <Error error={ error } />

        <Gallery ref="gallery" search={ search } items={ items } picked={ this.state.picked } onPicked={ this._onPicked } onKeyDown={ this._onKeyDown } />

        <footer className="ars-dialog-footer">
          <Button ref="cancel" onClick={ this.props.onExit }>Cancel</Button>
          <Button ref="confirm" onClick={ this._onConfirm } raised>Okay</Button>
        </footer>

      </FocusTrap>
    )
  },

  _onSearchChange(search) {
    this.setState({ search }, this.fetch)
  },

  _onPicked(picked) {
    this.setState({ picked })
  },

  _onConfirm(e) {
    e.preventDefault()
    this.confirm()
  },

  _onKeyDown({ key, metaKey, ctrlKey }) {
    let properMod = metaKey || ctrlKey

    switch (key) {
      case 'Enter':
        if (properMod) this.confirm()
        break
    }
  }

})

export default Picker