import { Observable, Frame, alert, action } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user';

interface Transacao {
    id: string;
    descricao: string;
    valor: number;
    tipo: 'entrada' | 'saida';
    categoria: string;
    data: string;
}

export class FinanceViewModel extends Observable {
    private authService: AuthService;
    private _transacoes: Array<Transacao>;
    public isAdmin: boolean = false;
    private _periodoSelecionado: string = 'Este Mês';
    private readonly MAX_BAR_HEIGHT = 100;

    constructor() {
        super();
        this.authService = AuthService.getInstance();
        this.isAdmin = this.authService.hasPermission([UserRole.PASTOR, UserRole.SECRETARY]);
        
        // Dados de exemplo - Substituir por dados reais do backend
        this._transacoes = [
            {
                id: '1',
                descricao: 'Dízimos',
                valor: 1500.00,
                tipo: 'entrada',
                categoria: 'Dízimos',
                data: '01/03/2024'
            },
            {
                id: '2',
                descricao: 'Ofertas',
                valor: 800.00,
                tipo: 'entrada',
                categoria: 'Ofertas',
                data: '02/03/2024'
            },
            {
                id: '3',
                descricao: 'Conta de Luz',
                valor: 450.00,
                tipo: 'saida',
                categoria: 'Despesas',
                data: '05/03/2024'
            },
            {
                id: '4',
                descricao: 'Oferta Especial',
                valor: 1200.00,
                tipo: 'entrada',
                categoria: 'Ofertas',
                data: '06/03/2024'
            },
            {
                id: '5',
                descricao: 'Material de Limpeza',
                valor: 350.00,
                tipo: 'saida',
                categoria: 'Despesas',
                data: '07/03/2024'
            }
        ];
    }

    get transacoes(): Array<Transacao> {
        return this._transacoes;
    }

    get periodoSelecionado(): string {
        return this._periodoSelecionado;
    }

    get totalEntradas(): number {
        return this._transacoes
            .filter(t => t.tipo === 'entrada')
            .reduce((sum, t) => sum + t.valor, 0);
    }

    get totalSaidas(): number {
        return this._transacoes
            .filter(t => t.tipo === 'saida')
            .reduce((sum, t) => sum + t.valor, 0);
    }

    get saldoTotal(): number {
        return this.totalEntradas - this.totalSaidas;
    }

    get entradaBarHeight(): number {
        const maiorValor = Math.max(this.totalEntradas, this.totalSaidas);
        return maiorValor > 0 ? (this.totalEntradas / maiorValor) * this.MAX_BAR_HEIGHT : 0;
    }

    get saidaBarHeight(): number {
        const maiorValor = Math.max(this.totalEntradas, this.totalSaidas);
        return maiorValor > 0 ? (this.totalSaidas / maiorValor) * this.MAX_BAR_HEIGHT : 0;
    }

    onBack() {
        Frame.topmost().goBack();
    }

    async onFilter() {
        const result = await action({
            title: 'Filtrar por',
            actions: ['Todas', 'Entradas', 'Saídas', 'Por Categoria'],
            cancelButtonText: 'Cancelar'
        });

        if (result !== 'Cancelar') {
            // TODO: Implementar filtros
            console.log('Filtrar por:', result);
        }
    }

    async onChangePeriodo() {
        const result = await action({
            title: 'Selecionar Período',
            actions: ['Este Mês', 'Último Mês', 'Este Ano', 'Personalizado'],
            cancelButtonText: 'Cancelar'
        });

        if (result !== 'Cancelar') {
            this._periodoSelecionado = result;
            this.notifyPropertyChange('periodoSelecionado', result);
            // TODO: Atualizar transações baseado no período
        }
    }

    async onAddTransaction() {
        // TODO: Implementar adição de transação
        const options = {
            title: 'Nova Transação',
            message: 'Escolha o tipo de transação',
            actions: ['Entrada', 'Saída'],
            cancelButtonText: 'Cancelar'
        };

        const result = await action(options);
        if (result !== 'Cancelar') {
            // TODO: Navegar para página de adicionar transação
            console.log('Adicionar nova transação do tipo:', result);
        }
    }

    async onTransactionMenu(args: any) {
        const transacao = this._transacoes[args.index];
        const result = await action({
            title: transacao.descricao,
            actions: ['Editar', 'Excluir', 'Ver Detalhes'],
            cancelButtonText: 'Cancelar'
        });

        switch (result) {
            case 'Editar':
                this.editTransaction(transacao);
                break;
            case 'Excluir':
                this.deleteTransaction(transacao);
                break;
            case 'Ver Detalhes':
                this.viewTransactionDetails(transacao);
                break;
        }
    }

    private async editTransaction(transacao: Transacao) {
        // TODO: Navegar para página de edição
        console.log('Editar transação:', transacao);
    }

    private async deleteTransaction(transacao: Transacao) {
        const confirmResult = await confirm({
            title: 'Confirmar Exclusão',
            message: `Deseja realmente excluir a transação "${transacao.descricao}"?`,
            okButtonText: 'Sim',
            cancelButtonText: 'Não'
        });

        if (confirmResult) {
            // TODO: Implementar exclusão
            console.log('Excluir transação:', transacao);
        }
    }

    private viewTransactionDetails(transacao: Transacao) {
        // TODO: Navegar para página de detalhes
        console.log('Ver detalhes da transação:', transacao);
    }
} 