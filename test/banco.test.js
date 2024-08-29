const { depositar, sacar, transferir, obterSaldo } = require("../src/calculator");


const Banco = require('../src/banco.js'); 
describe('Banco', () => {
    let banco;
    let bancoDestino;

    beforeEach(() => {
        banco = new Banco('contaDanilo', 1000);
        bancoDestino = new Banco('contaLuz');
    });

    test('deve inicializar com saldo e nome', () => {
        expect(banco.nome).toStrictEqual('contaDanilo');
        expect(banco.saldo).toStrictEqual(1000);
        expect(banco.transacoes).toStrictEqual([]);
    });

    test('deve depositar dinheiro', () => {
        banco.depositar(500);
        expect(banco.saldo).toStrictEqual(1500);
        expect(banco.transacoes).toStrictEqual([{ tipo: 'Depósito', valor: 500 }]);
    });

    test('deve sacar dinheiro', () => {
        banco.sacar(200);
        expect(banco.saldo).toStrictEqual(800);
        expect(banco.transacoes).toStrictEqual([{ tipo: 'Saque', valor: 200 }]);
    });

    test('não deve permitir sacar mais do que o saldo', () => {
        expect(() => banco.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('deve transferir dinheiro para outra conta', () => {
        banco.transferir(300, bancoDestino);
        expect(banco.saldo).toStrictEqual(700);
        expect(bancoDestino.saldo).toStrictEqual(300);
        /*expect(banco.transacoes).toStrictEqual([
            { tipo: 'Transferência', valor: 300, destino: 'contaLuz' }
        ]);*/
        expect(bancoDestino.transacoes).toStrictEqual([
            { tipo: 'Depósito', valor: 300 }
        ]);
    });

    test('deve obter saldo atual', () => {
        expect(banco.obterSaldo()).toBe(1000);
    });

    test('deve obter histórico de transações', () => {
        banco.depositar(500);
        banco.sacar(200);
        expect(banco.obterHistorico()).toEqual([
            { tipo: 'Depósito', valor: 500 },
            { tipo: 'Saque', valor: 200 }
        ]);
    });

    test('deve definir e verificar limite de saque', () => {
        banco.definirLimiteDeSaque(500);
        expect(() => banco.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
        expect(banco.verificarLimiteDeSaque(400)).toBe(true);
    });

    test('deve aplicar juros ao saldo', () => {
        banco.aplicarJuros(5);
        expect(banco.saldo).toBe(1050);
        expect(banco.transacoes).toContainEqual({ tipo: 'Juros', valor: 50 });
    });

    test('deve pagar uma conta', () => {
        banco.pagarConta(100, 'Conta de luz');
        expect(banco.saldo).toBe(900);
        expect(banco.transacoes).toContainEqual({ tipo: 'Pagamento', valor: 100, descricao: 'Conta de luz' });
    });

    test('deve obter o total depositado', () => {
        banco.depositar(500);
        banco.depositar(200);
        expect(banco.obterTotalDepositado()).toBe(700);
    });

});

