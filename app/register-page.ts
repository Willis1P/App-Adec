import { EventData, Page } from '@nativescript/core';
import { RegisterViewModel } from './register-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    if (!page.bindingContext) {
        page.bindingContext = new RegisterViewModel();
    }
} 