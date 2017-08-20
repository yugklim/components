import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
    downPanelInRight: true
});

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
