import { mockAuthResponse, mockCredential } from "./data/auth";
import { delay, http, HttpResponse } from "msw";
import { addTransaction, getTransactionsDb } from "./data/store";
import { getApiBaseUrl } from "../service";
import type { ApiErrorResponse } from "../test/reponse-error-api";
import type { MockTransaction } from "./data/transactions";


// IMPORTANTE: o uso do msw permite criar os handlers que vão simular as nossas requisições da api, durante o uso da aplicação.

const API_BASE_URL = getApiBaseUrl();

export const handlers = [
    http.post(`${API_BASE_URL}/login`, async ({ request }) => {
        const body = (await request.json()) as { document: string, password: string };

        await delay(3000);

        if (body.document === mockCredential.document && body.password === mockCredential.password) {
            return HttpResponse.json(mockAuthResponse, { status: 200 });
        }

        return HttpResponse.json<ApiErrorResponse>({ message: "Usuário ou senha Inválidos" }, { status: 401 });
    }),

    http.get(`${API_BASE_URL}/transactions`, async () => {
        await delay(3000);
        return HttpResponse.json(getTransactionsDb(), { status: 200 });
    }),

    http.post(`${API_BASE_URL}/transfer`, async ({ request }) => {
        await delay(3000);
        const body = (await request.json()) as { recipientDocument: string, amount: number, description?: string };

        if (!body.recipientDocument || !body.amount || body.amount <= 0) {
            return HttpResponse.json({ message: 'Dados de transferencia inválidos' }, { status: 400 });
        }
        const newTransaction: MockTransaction = {
            id: crypto.randomUUID(),
            type: "transfer" as const,
            amount: body.amount,
            description: body.description || `Transferência Realizada para ${body.recipientDocument}`,
            createdAt: new Date().toISOString(),
            recipientDocument: body.recipientDocument
        }        
        addTransaction(newTransaction);;

        return HttpResponse.json({ message: "Transferência realizada com sucesso", transaction: newTransaction }, { status: 201 });
    })

]