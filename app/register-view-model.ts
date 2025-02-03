import { Observable, Frame } from '@nativescript/core';
import { Icons } from './resources';
import { AuthService } from './services/auth.service';

export class RegisterViewModel extends Observable {
    private _name: string = '';
    private _email: string = '';
    private _password: string = '';
    private _confirmPassword: string = '';
    private _isLoading: boolean = false;
    private _errorMessage: string = '';
    private _isPasswordVisible: boolean = false;
    private authService: AuthService;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange('name', value);
            this.validateForm();
        }
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

    get confirmPassword(): string {
        return this._confirmPassword;
    }

    set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange('confirmPassword', value);
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

    get icons() {
        return Icons.auth;
    }

    get isFormValid(): boolean {
        return (
            this.name.length >= 3 &&
            this.email.length > 0 &&
            this.email.includes('@') &&
            this.password.length >= 6 &&
            this.password === this.confirmPassword
        );
    }

    public togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    private validateForm() {
        this.notifyPropertyChange('isFormValid', this.isFormValid);
    }

    public async register() {
        if (!this.isFormValid) {
            if (this.name.length < 3) {
                this.errorMessage = 'O nome deve ter pelo menos 3 caracteres.';
            } else if (!this.email.includes('@')) {
                this.errorMessage = 'Por favor, insira um email válido.';
            } else if (this.password.length < 6) {
                this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            } else if (this.password !== this.confirmPassword) {
                this.errorMessage = 'As senhas não coincidem.';
            } else {
                this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
            }
            return;
        }

        try {
            this.isLoading = true;
            this.errorMessage = '';

            await this.authService.register(this.email, this.password, this.name);
            
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
            this.errorMessage = error.message || 'Ocorreu um erro ao tentar criar a conta.';
        } finally {
            this.isLoading = false;
        }
    }

    public backToLogin() {
        Frame.topmost().goBack();
    }
} 