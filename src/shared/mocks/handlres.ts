import { mockAuthResponse, mockCredential } from "./data/auth";
import { delay, http, HttpResponse } from "msw";
import { addTransaction, getTransactionsDb } from "./data/store";
import { getApiBaseUrl } from "../service";


// IMPORTANTE: o uso do msw permite criar os handlers que vão simular as nossas requisições da api, durante o uso da aplicação.


export const handlers = [
    http.post(`${getApiBaseUrl()}/login`, async ({ request }) => {
        const body = (await request.json()) as { document: string, password: string };

        await delay(3000);

        if (body.document === mockCredential.document && body.password === mockCredential.password) {
            return HttpResponse.json(mockAuthResponse, { status: 200 });
        }

        return HttpResponse.json({ message: "Usuário ou senha Invalodos" }, { status: 401 });
    }),

    http.get(`${getApiBaseUrl()}/transactions`, async () => {
        return HttpResponse.json(getTransactionsDb(), { status: 200 });
    }),

    http.post(`${getApiBaseUrl()}/transfer`, async ({ request }) => {
        const body = (await request.json()) as { recipient: string, amount: number, bank: string, description?: string };
        if (!body.recipient || !body.bank || !body.amount || body.amount <= 0) {
            return HttpResponse.json({ message: 'Dados de transferencia inválidos' }, { status: 400 });
        }
        const newTransaction = {
            id: crypto.randomUUID(),
            type: "transfer" as const,
            amount: body.amount,
            description: body.description || `Transferência Realizada para ${body.recipient}`,
            date: new Date().toISOString(),
            bank: body.bank,
            recipientDocument: body.recipient
        }

        addTransaction(newTransaction);;

        return HttpResponse.json({ message: "Transferência realizada com sucesso", transactionData: newTransaction }, { status: 201 });
    })

]