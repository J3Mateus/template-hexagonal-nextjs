const fs = require('fs');
const path = require('path');

function getModels() {
    const modelsDir = path.resolve(__dirname, 'src/@code/core/domain/models');
    return fs.readdirSync(modelsDir)
        .filter(file => file.endsWith('.ts'))  // Filtra apenas arquivos TypeScript
        .map(file => path.basename(file, '.ts'));  // Remove a extensão para o nome do modelo
}

module.exports = function (plop) {
   // Helper para dividir e remover espaços de strings
   plop.setHelper('split', (text, delimiter) => {
        if (typeof text !== 'string') return [];
        return text.split(delimiter).map(s => s.trim());
    });

    plop.setHelper('pascalCase', (text) => {
        return text.replace(/(^\w|_\w)/g, (match) => match.replace('_', '').toUpperCase());
    });

    plop.setHelper('trim', (text) => typeof text === 'string' ? text.trim() : text);
    plop.setHelper('index', (array, idx) => Array.isArray(array) ? array[idx] : '');

    // Atualização do helper parseMethod para capturar nome, parâmetros e tipo de retorno corretamente
    plop.setHelper('parseMethod', (text) => {
        const match = text.match(/^(\w+)\(([^)]*)\):\s*(.+)$/);
        if (!match) return { name: '', params: '', returnType: '' };
        return {
            name: match[1].trim(),
            params: match[2].trim() || '', // only include params if they exist
            returnType: match[3].trim(),
        };
    });


    // Gerador para UseCase Interface
    plop.setGenerator('usecaseInterface', {
        description: 'Gera uma interface UseCase',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Qual o nome do UseCase?'
            },
            {
                type: 'input',
                name: 'methods',
                message: 'Defina os métodos e tipos de retorno (ex: getToken:string | undefined, clearAssistant:void)',
            },
            {
                type: 'checkbox',
                name: 'models',
                message: 'Selecione os modelos que deseja importar:',
                choices: getModels() // Usa a função getModels para obter as opções
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/@code/core/interfaces/usecases/{{camelCase name}}UseCase.ts',
                templateFile: 'plop-templates/UseCaseInterface.hbs'
            }
        ]
    });

    // Gerador para Adapter Interface
    plop.setGenerator('adapterInterface', {
        description: 'Gera uma interface Adapter',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Qual o nome do Adapter?'
            },
            {
                type: 'input',
                name: 'methods',
                message: 'Defina os métodos e tipos de retorno (ex: saveAuthorization:void, clearAuthorization:void)',
            },
            {
                type: 'checkbox',
                name: 'models',
                message: 'Selecione os modelos que deseja importar:',
                choices: getModels() // Usa a função getModels para obter as opções
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/@code/core/interfaces/adapters/{{camelCase name}}Adapter.ts',
                templateFile: 'plop-templates/AdapterInterface.hbs'
            }
        ]
    });

    // Gerador para Service
    plop.setGenerator('service', {
        description: 'Gera um serviço baseado na interface UseCase',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Qual o nome do Service?'
            },
            {
                type: 'input',
                name: 'methods',
                message: 'Defina os métodos e tipos de retorno (ex: fetch:Promise<Post[]>)'
            },
            {
                type: 'checkbox',
                name: 'models',
                message: 'Selecione os modelos que deseja importar:',
                choices: getModels() // Usa a função getModels para obter as opções
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/@code/core/services/{{camelCase name}}Service.ts',
                templateFile: 'plop-templates/Service.hbs'
            }
        ]
    });

    // Gerador para Infra (API)
    plop.setGenerator('infra', {
        description: 'Gera uma infraestrutura API',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Qual o nome da API?'
            },
            {
                type: 'input',
                name: 'methods',
                message: 'Defina os métodos e tipos de retorno (ex: fetch:Promise<Post[]>)'
            },
            {
                type: 'checkbox',
                name: 'models',
                message: 'Selecione os modelos que deseja importar:',
                choices: getModels() // Usa a função getModels para obter as opções
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/@code/infra/api/{{camelCase name}}API.ts',
                templateFile: 'plop-templates/Infra.hbs'
            }
        ]
    });

};
