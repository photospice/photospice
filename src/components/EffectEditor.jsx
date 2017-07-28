import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { bound } from '../lib/commonDecorators.js';
import Toggle from './Toggle.jsx';
import UniformEditor from './UniformEditor.jsx';

export default class EffectEditor extends React.Component {
  constructor(props) {
    super();
    this.state = props.effect;
  }

  EffectHandle = SortableHandle(() => {
    return <span className='effect-editor-name'>
      <i>fx</i> <b>{this.state.name}</b>
    </span>
  });

  handleUniformChange(value, uniform) {
    uniform.value = value;
    this.props.updatePhoto();
  }

  @bound
  toggleEffect() {
    this.setState({ isDisabled: !this.state.isDisabled });
    this.props.updatePhoto();
  }

  render() {
    return (<li className='effect-editor'>
      <div className='effect-editor-header'>
        <Toggle value={!this.state.isDisabled} onChange={this.toggleEffect} />
        <this.EffectHandle />
        <div className='effect-editor-actions'>
          <button
            className='button button-muted'
            onClick={this.props.removePass}>
            Remove
          </button>
        </div>
      </div>
      <ul>
        {this.state.uniforms.map((uniform, index) => <li key={index}>
          <UniformEditor
            uniform={uniform}
            value={uniform.value}
            onChange={(v) => this.handleUniformChange(v, uniform)} />
        </li>)}
      </ul>
    </li>);
  }
}