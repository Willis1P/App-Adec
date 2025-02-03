import { Observable } from '@nativescript/core';
import { getString, setString, remove } from '@nativescript/core/application-settings';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export class AuthService extends Observable {
    private static instance: AuthService;
    private currentUser: User | null = null;
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'user_data';

    private constructor() {
        super();
        this.loadStoredUser();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    private loadStoredUser(): void {
        const userData = getString(this.USER_KEY);
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        }
    }

    public async login(email: string, password: string): Promise<User> {
        try {
            // TODO: Implementar chamada real à API
            // Simulação de chamada à API
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (email === 'admin@adec.com' && password === '123456') {
                const user: User = {
                    id: '1',
                    email: email,
                    name: 'Administrador',
                    role: 'admin'
                };

                // Salvar token e dados do usuário
                setString(this.TOKEN_KEY, 'fake_token_123');
                setString(this.USER_KEY, JSON.stringify(user));
                
                this.currentUser = user;
                return user;
            }

            throw new Error('Credenciais inválidas');
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }

    public logout(): void {
        try {
            remove(this.TOKEN_KEY);
            remove(this.USER_KEY);
            this.currentUser = null;
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    public isAuthenticated(): boolean {
        return !!getString(this.TOKEN_KEY);
    }

    public getCurrentUser(): User | null {
        return this.currentUser;
    }

    public async register(email: string, password: string, name: string): Promise<User> {
        try {
            // TODO: Implementar chamada real à API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user: User = {
                id: Date.now().toString(),
                email,
                name,
                role: 'member'
            };

            // Simular registro bem-sucedido
            setString(this.TOKEN_KEY, 'fake_token_' + user.id);
            setString(this.USER_KEY, JSON.stringify(user));
            
            this.currentUser = user;
            return user;
        } catch (error) {
            console.error('Erro no registro:', error);
            throw error;
        }
    }

    public async resetPassword(email: string): Promise<void> {
        try {
            // TODO: Implementar chamada real à API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simular envio de email
            if (!email.includes('@')) {
                throw new Error('Email inválido');
            }
        } catch (error) {
            console.error('Erro ao resetar senha:', error);
            throw error;
        }
    }
}