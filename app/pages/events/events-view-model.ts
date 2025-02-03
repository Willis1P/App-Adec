import { Observable, Frame } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user';

export class EventsViewModel extends Observable {
    private authService: AuthService;
    private _events: Array<any>;
    public isAdmin: boolean = false;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.isAdmin = this.authService.hasPermission([UserRole.PASTOR]);
        
        // Dados de exemplo - Substituir por dados reais do backend
        this._events = [
            {
                title: 'Culto de Domingo',
                date: 'Domingo, 19:00',
                description: 'Culto de Celebração'
            },
            {
                title: 'Reunião de Jovens',
                date: 'Sábado, 20:00',
                description: 'Encontro semanal dos jovens'
            },
            {
                title: 'Escola Dominical',
                date: 'Domingo, 09:00',
                description: 'Aulas bíblicas para todas as idades'
            }
        ];
    }

    get events(): Array<any> {
        return this._events;
    }

    get currentDate(): string {
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date().toLocaleDateString('pt-BR', options);
    }

    onBack() {
        Frame.topmost().goBack();
    }

    onEventTap(args: any) {
        const event = this._events[args.index];
        console.log('Evento selecionado:', event);
        // TODO: Navegar para detalhes do evento
    }

    onAddEvent() {
        // TODO: Navegar para página de criação de evento
        console.log('Adicionar novo evento');
    }
}
