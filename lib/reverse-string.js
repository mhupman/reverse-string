'use babel';

import ReverseStringView from './reverse-string-view';
import { CompositeDisposable } from 'atom';

export default {

  reverseStringView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.reverseStringView = new ReverseStringView(state.reverseStringViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.reverseStringView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'reverse-string:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.reverseStringView.destroy();
  },

  serialize() {
    return {
      reverseStringViewState: this.reverseStringView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection
        .split('\n')
        .map(function(line) {
          return line.split('').reverse().join('')
        })
        .join('\n')
      editor.insertText(reversed)
    }
  }

};
