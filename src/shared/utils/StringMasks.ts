const StringMasks = {



    formataCPF(cpf: string | null | undefined): string {
        if (!cpf) return '';

        const cleanedCpf = cpf.replace(/[^\d]/g, '');

        return cleanedCpf.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
    }

}

export default StringMasks;