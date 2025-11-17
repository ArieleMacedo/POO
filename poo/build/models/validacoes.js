import PromptSync from "prompt-sync";
import { limparTela } from "./utils.js";
const input = PromptSync({ sigint: true });
export class Validacoes {
    numeroInteiro(text) {
        let num = NaN;
        while (!Number.isInteger(num)) {
            const valor = Number(input(text));
            if (Number.isInteger(valor)) {
                num = valor;
            }
            else {
                console.log("Erro: Digite um número inteiro.");
            }
        }
        return num;
    }
    numIntMinMax(text, min, max) {
        let num = NaN;
        while (isNaN(num) || num < min || num > max) {
            const valor = this.numeroInteiro(text);
            if (valor >= min && valor <= max) {
                num = valor;
            }
            else {
                console.log(`O número deve estar entre ${min} e ${max}.`);
            }
        }
        return num;
    }
    numFloatPositivo(text) {
        let num = NaN;
        while (isNaN(num) || num <= 0) {
            const valor = parseFloat(input((text)));
            if (!isNaN(valor) && valor > 0) {
                num = valor;
            }
            else {
                console.log("Digite um número maior que 0.");
            }
        }
        return num;
    }
    numPositivo(text) {
        let num = NaN;
        while (!Number(num)) {
            const valor = Number(input(text));
            if (Number(valor) && valor > 0) {
                num = valor;
            }
            else {
                console.log("Digite um número maior que 0.");
            }
        }
        return num;
    }
    validarTexto(text) {
        let umtexto = "";
        while (umtexto.length === 0) {
            const texto = input(text);
            if (texto.length > 0) {
                umtexto = texto;
            }
            else {
                console.log("Insira um caracter.");
            }
        }
        return umtexto;
    }
    lerDataNascimento() {
        const texto = input("Digite sua data de nascimento(ANO-MÊS-DIA): ");
        const data = new Date(texto);
        if (isNaN(data.getTime())) {
            console.log("Data inválida! Tente novamente(use o formato ANO-MÊS-DIA).");
            return this.lerDataNascimento();
        }
        const hoje = new Date();
        if (data > hoje) {
            console.log("A data não pode ser no futuro.");
            return this.lerDataNascimento();
        }
        return data;
    }
    tentativa(acao, nomeAcao, funcao) {
        try {
            limparTela();
            acao();
            if (this.continuar(nomeAcao.toLocaleLowerCase()) === 1) {
                funcao();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Não foi possivel ${nomeAcao}:`, error.message);
                const tentarNovamente = this.numIntMinMax("Deseja tentar novamente? (1- Sim | 2- Não): ", 1, 2);
                if (tentarNovamente === 1) {
                    funcao();
                }
            }
        }
    }
    continuar(nomeAcao) {
        return this.numIntMinMax(`Deseja continuar a ${nomeAcao}? (1- Sim | 2- Não): `, 1, 2);
    }
}
//# sourceMappingURL=validacoes.js.map