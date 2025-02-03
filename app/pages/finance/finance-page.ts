import { EventData, Page } from '@nativescript/core';
import { FinanceViewModel } from './finance-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    if (!page.bindingContext) {
        page.bindingContext = new FinanceViewModel();
    }
}

// Filtro de moeda
export function currencyFormat(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
} 