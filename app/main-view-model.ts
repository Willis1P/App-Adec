import { Observable, Frame } from '@nativescript/core';
import { AuthService } from './services/auth.service';
import { User } from './models/user';

export class MainViewModel extends Observable {
  private authService: AuthService;
  private currentUser: User | null;
  private _recentActivities: Array<{ icon: string; description: string }>;

  constructor() {
    super();
    this.authService = AuthService.getInstance();
    this.currentUser = this.authService.getCurrentUser();
    this._recentActivities = [
      { icon: '\uf073', description: 'Culto de Domingo às 18h' },
      { icon: '\uf0c0', description: 'Novo membro: Maria Silva' },
      { icon: '\uf0d6', description: 'Relatório financeiro atualizado' },
      { icon: '\uf0a1', description: 'Encontro de jovens no sábado' }
    ];
    this.updateWelcomeMessage();
  }

  get welcomeMessage(): string {
    if (!this.currentUser) {
      return 'Bem-vindo ao ADEC App';
    }
    return `Bem-vindo, ${this.currentUser.name}!`;
  }

  get recentActivities(): Array<{ icon: string; description: string }> {
    return this._recentActivities;
  }

  private navigate(page: string) {
    Frame.topmost().navigate({
      moduleName: `pages/${page}/${page}-page`,
      transition: {
        name: 'fade',
        duration: 200
      }
    });
  }

  onEventsTab() {
    this.navigate('events');
  }

  onFinanceTab() {
    this.navigate('finance');
  }

  onMembersTab() {
    this.navigate('members');
  }

  onAnnouncementsTab() {
    this.navigate('announcements');
  }

  onHomeTab() {
    // Já estamos na home
    console.log('Home tab clicked');
  }

  onProfileTab() {
    this.navigate('profile');
  }

  onGroupsTab() {
    this.navigate('groups');
  }

  onSettingsTab() {
    this.navigate('settings');
  }

  onLogout() {
    this.authService.logout();
    Frame.topmost().navigate({
      moduleName: 'login-page',
      clearHistory: true,
      transition: {
        name: 'fade',
        duration: 200
      }
    });
  }

  private updateWelcomeMessage() {
    this.notifyPropertyChange('welcomeMessage', this.welcomeMessage);
  }
}