import { Observable, Frame } from '@nativescript/core';
import { Icons } from './resources';
import { AuthService } from './services/auth.service';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _isLoading: boolean = false;
    private _errorMessage: string = '';
    private _isPasswordVisible: boolean = false;
    private _version: string = '1.0.0';
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
            this.validateForm();
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
            this.validateForm();
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    get isPasswordVisible(): boolean {
        return this._isPasswordVisible;
    }

    set isPasswordVisible(value: boolean) {
        if (this._isPasswordVisible !== value) {
            this._isPasswordVisible = value;
            this.notifyPropertyChange('isPasswordVisible', value);
        }
    }

    get version(): string {
        return this._version;
    }

    get icons() {
        return Icons.auth;
    }

    get isFormValid(): boolean {
        return this.email.length > 0 && this.password.length >= 6;
    }

    public togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    private validateForm() {
        this.notifyPropertyChange('isFormValid', this.isFormValid);
    }

    public async login() {
        if (!this.isFormValid) {
            this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
            return;
        }

        try {
            this.isLoading = true;
            this.errorMessage = '';

            await this.authService.login(this.email, this.password);
            
            // Navegar para a página principal
            Frame.topmost().navigate({
                moduleName: 'main-page',
                clearHistory: true,
                transition: {
                    name: 'fade',
                    duration: 200
                }
            });
            
        } catch (error) {
            this.errorMessage = error.message || 'Ocorreu um erro ao tentar fazer login.';
        } finally {
            this.isLoading = false;
        }
    }

    public register() {
        Frame.topmost().navigate({
            moduleName: 'register-page',
            transition: {
                name: 'slideLeft',
                duration: 200
            }
        });
    }

    public async forgotPassword() {
        if (!this.email) {
            this.errorMessage = 'Por favor, insira seu email para recuperar a senha.';
            return;
        }

        try {
            this.isLoading = true;
            this.errorMessage = '';

            await this.authService.resetPassword(this.email);
            
            // Mostrar mensagem de sucesso
            this.errorMessage = 'Instruções de recuperação de senha foram enviadas para seu email.';
            
        } catch (error) {
            this.errorMessage = error.message || 'Ocorreu um erro ao tentar recuperar a senha.';
        } finally {
            this.isLoading = false;
        }
    }
}