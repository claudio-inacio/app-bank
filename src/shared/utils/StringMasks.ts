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

    moneyMask: (valor: string | number) => {
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

}

export default StringMasks;