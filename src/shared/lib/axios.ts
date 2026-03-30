import axios from 'axios';
import { getApiBaseUrl } from '../service';

export const api = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 10000,
});

api.interceptors.request.use(config => {
    // FEATURE: veriricar o token do local storage, e retornar o config com o header de autorização, ou seja, o token do usuário logado
    return config
})

api.interceptors.response.use((response) => response, (error) => {
    // FEATURE: validação do erro retornado e redirecionamento para a página correta, ou exibição de uma mensagem de erro para o usuário.
    return Promise.reject(error)
});