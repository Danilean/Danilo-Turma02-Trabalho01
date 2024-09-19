const SistemaDeGestao = require('../src/gestao');

describe('SistemaDeGestao', () => {
    let sistema;

    beforeEach(() => {
        sistema = new SistemaDeGestao();
    });

    describe('Funcionários', () => {
        test('Deve adicionar e listar todos os funcionários corretamente.', () => {
            const funcionario1 = { id: 1, nome: 'Lucas', departamento: 'TI', cargo: 'Desenvolvedor', salario: 5000 };
            const funcionario2 = { id: 2, nome: 'Julia', departamento: 'TI', cargo: 'Designer', salario: 5500 };
            sistema.adicionarFuncionario(funcionario1);
            sistema.adicionarFuncionario(funcionario2);
            expect(sistema.listarFuncionarios()).toEqual(expect.arrayContaining([funcionario1, funcionario2]));
        });

        test('Deve contar o número de funcionários corretamente.', () => {
            sistema.adicionarFuncionario({ id: 3, nome: 'Pedro', departamento: 'Marketing', cargo: 'Gerente', salario: 6000 });
            sistema.adicionarFuncionario({ id: 4, nome: 'Maria', departamento: 'Financeiro', cargo: 'Analista', salario: 7000 });
            expect(sistema.contarFuncionarios()).toBe(2);
        });

        test('Deve listar funcionários por departamento corretamente.', () => {
            const funcionario1 = { id: 5, nome: 'Rafael', departamento: 'TI', cargo: 'Desenvolvedor', salario: 5000 };
            const funcionario2 = { id: 6, nome: 'Lia', departamento: 'RH', cargo: 'Analista', salario: 6000 };
            sistema.adicionarFuncionario(funcionario1);
            sistema.adicionarFuncionario(funcionario2);
            expect(sistema.listarFuncionariosPorDepartamento('TI')).toEqual([funcionario1]);
        });

        test('Deve contar funcionários por departamento corretamente.', () => {
            sistema.adicionarFuncionario({ id: 7, nome: 'Felipe', departamento: 'TI', cargo: 'Desenvolvedor', salario: 5000 });
            sistema.adicionarFuncionario({ id: 8, nome: 'Paula', departamento: 'TI', cargo: 'Designer', salario: 5500 });
            sistema.adicionarFuncionario({ id: 9, nome: 'Ana', departamento: 'RH', cargo: 'Gerente', salario: 7000 });
            expect(sistema.contarFuncionariosPorDepartamento('TI')).toBe(2); 
            expect(sistema.contarFuncionariosPorDepartamento('RH')).toBe(1); 
        });

        test('Deve aumentar o salário de um funcionário corretamente.', () => {
            const funcionario = { id: 10, nome: 'Roberto', departamento: 'TI', cargo: 'Desenvolvedor', salario: 4000 };
            sistema.adicionarFuncionario(funcionario);
            sistema.aumentarSalario(10, 10);
            expect(sistema.buscarFuncionarioPorId(10).salario).toBe(4400);
        });

        test('Deve demitir um funcionário corretamente.', () => {
            const funcionario = { id: 11, nome: 'Mariana', departamento: 'Marketing', cargo: 'Gerente', salario: 8000 };
            sistema.adicionarFuncionario(funcionario);
            sistema.demitirFuncionario(11);
            expect(sistema.buscarFuncionarioPorId(11)).toBeUndefined();
        });

        test('Deve listar funcionários por cargo corretamente.', () => {
            const funcionario1 = { id: 12, nome: 'Lucas', departamento: 'TI', cargo: 'Desenvolvedor', salario: 5000 };
            const funcionario2 = { id: 13, nome: 'Julia', departamento: 'TI', cargo: 'Designer', salario: 5500 };
            sistema.adicionarFuncionario(funcionario1);
            sistema.adicionarFuncionario(funcionario2);
            expect(sistema.listarFuncionariosPorCargo('Desenvolvedor')).toEqual([funcionario1]);
        });
    });

    describe('Projetos', () => {
        test('Deve adicionar e listar todos os projetos corretamente.', () => {
            const projeto1 = { id: 1, nome: 'Projeto A', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            const projeto2 = { id: 2, nome: 'Projeto B', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            sistema.adicionarProjeto(projeto1);
            sistema.adicionarProjeto(projeto2);
            expect(sistema.listarProjetos()).toEqual(expect.arrayContaining([projeto1, projeto2]));
        });

        test('Deve contar o número de projetos corretamente.', () => {
            sistema.adicionarProjeto({ id: 3, nome: 'Projeto C', departamento: 'Marketing', idFuncionarioResponsavel: 1, concluido: false });
            expect(sistema.contarProjetos()).toBe(1);
        });

        test('Deve listar projetos por departamento corretamente.', () => {
            const projeto1 = { id: 4, nome: 'Projeto D', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            const projeto2 = { id: 5, nome: 'Projeto E', departamento: 'RH', idFuncionarioResponsavel: 2, concluido: false };
            sistema.adicionarProjeto(projeto1);
            sistema.adicionarProjeto(projeto2);
            expect(sistema.listarProjetosPorDepartamento('TI')).toEqual([projeto1]);
        });

        test('Deve marcar um projeto como concluído corretamente.', () => {
            const projeto = { id: 6, nome: 'Projeto F', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            sistema.adicionarProjeto(projeto);
            sistema.marcarProjetoComoConcluido(6);
            expect(sistema.buscarProjetoPorId(6).concluido).toBe(true);
        });

        test('Deve listar projetos concluídos corretamente.', () => {
            const projeto1 = { id: 7, nome: 'Projeto G', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: true };
            const projeto2 = { id: 8, nome: 'Projeto H', departamento: 'RH', idFuncionarioResponsavel: 2, concluido: false };
            sistema.adicionarProjeto(projeto1);
            sistema.adicionarProjeto(projeto2);
            expect(sistema.listarProjetosConcluidos()).toEqual([projeto1]);
        });

        test('Deve contar projetos por departamento corretamente.', () => {
            const projeto1 = { id: 9, nome: 'Projeto I', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            const projeto2 = { id: 10, nome: 'Projeto J', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            sistema.adicionarProjeto(projeto1);
            sistema.adicionarProjeto(projeto2);
            expect(sistema.contarProjetosPorDepartamento('TI')).toBe(2);
        });

        test('Deve listar projetos por funcionário corretamente.', () => {
            const projeto = { id: 11, nome: 'Projeto K', departamento: 'TI', idFuncionarioResponsavel: 1, concluido: false };
            sistema.adicionarProjeto(projeto);
            expect(sistema.listarProjetosPorFuncionario(1)).toEqual([projeto]);
        });
    });

    describe('Departamentos', () => {
        test('Deve adicionar e listar todos os departamentos corretamente.', () => {
            const departamento1 = { id: 1, nome: 'TI' };
            const departamento2 = { id: 2, nome: 'RH' };
            sistema.adicionarDepartamento(departamento1);
            sistema.adicionarDepartamento(departamento2);
            expect(sistema.listarDepartamentos()).toEqual(expect.arrayContaining([departamento1, departamento2]));
        });

        test('Deve contar o número de departamentos corretamente.', () => {
            sistema.adicionarDepartamento({ id: 3, nome: 'Marketing' });
            expect(sistema.contarDepartamentos()).toBe(1);
        });

        test('Deve listar funcionários por departamento ID corretamente.', () => {
            const departamento = { id: 4, nome: 'Financeiro' };
            sistema.adicionarDepartamento(departamento);
            sistema.adicionarFuncionario({ id: 5, nome: 'Roberto', departamento: 'Financeiro', cargo: 'Analista', salario: 4000 });
            expect(sistema.listarFuncionariosPorDepartamentoId(4)).toEqual([sistema.buscarFuncionarioPorId(5)]);
        });
    });

    describe('Finanças', () => {
        beforeEach(() => {
            sistema.adicionarReceita(0);
            sistema.adicionarDespesa(0);
        });

        test('Deve adicionar receita corretamente.', () => {
            sistema.adicionarReceita(1000);
            expect(sistema.listarReceitas()).toBe(1000);
        });

        test('Deve adicionar despesa corretamente.', () => {
            sistema.adicionarDespesa(500);
            expect(sistema.listarDespesas()).toBe(500);
        });

        test('Deve calcular lucro corretamente.', () => {
            sistema.adicionarReceita(2000);
            sistema.adicionarDespesa(800);
            expect(sistema.calcularLucro()).toBe(1200);
        });

        test('Deve gerar relatório financeiro corretamente.', () => {
            sistema.adicionarReceita(3000);
            sistema.adicionarDespesa(1500);
            const relatorio = sistema.relatorioFinanceiro();
            expect(relatorio).toEqual({ receitas: 3000, despesas: 1500, lucro: 1500 });
        });
    });
});
