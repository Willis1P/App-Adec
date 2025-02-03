import { EventData, Page } from '@nativescript/core';
import { EventsViewModel } from './events-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    if (!page.bindingContext) {
        page.bindingContext = new EventsViewModel();
    }
}
