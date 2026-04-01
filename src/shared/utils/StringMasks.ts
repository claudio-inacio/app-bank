const StringMasks = {

    formataCPF(cpf: string | null | undefined): string {
        if (!cpf) return '';

        const cleanedCpf = cpf.replace(/[^\d]/g, '');

        return cleanedCpf.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
    },

    decimalMoneyMask(valor: string | number): string {
        if (!valor) return "";

        valor = valor.toString().replace(/[^\d]/g, "");

        if (isNaN(parseFloat(valor))) return "";

        if (valor.length === 1) {
            return `${valor},`;
        }

        const primeiraParte = valor[0];
        const decimalParte = valor.slice(1, 5);

        return `${primeiraParte},${decimalParte}`;
    },

    moneyMask(valor: string | number): string {
        if (!valor) return "";

        valor = valor.toString().replace(/[^\d]/g, "");

        if (valor.length === 3) {
            return valor.replace(/(\d{1})(\d{1})/, "$1,$2");
        }
        if (valor.length === 4) {
            return valor.replace(/(\d{2})(\d{2})/, "$1,$2");
        }
        if (valor.length === 5) {
            return valor.replace(/(\d{3})(\d{2})/, "$1,$2");
        }
        if (valor.length === 6) {
            return valor.replace(/(\d{1})(\d{3})(\d{2})/, "$1.$2,$3");
        }
        if (valor.length === 7) {
            return valor.replace(/(\d{2})(\d{3})(\d{2})/, "$1.$2,$3");
        }
        return valor.replace(/(\d{3})(\d{3})(\d{2})/, "$1.$2,$3");
    },
    
    cpfIsValid(strCPF?: string): boolean {
        if (!strCPF) return false;

        const cpf = strCPF.replace(/\D/g, '');

        if (cpf.length !== 11) return false;


        if (/^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        let resto: number;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

}

export default StringMasks;