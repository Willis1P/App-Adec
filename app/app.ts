import { Application } from '@nativescript/core';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': 'fonts/font-awesome.css'
};
TNSFontIcon.loadCss();

Application.run({ moduleName: 'app-root' });