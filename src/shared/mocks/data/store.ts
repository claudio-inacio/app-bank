import { mockTransactions, type MockTransaction } from "./transactions";


// IMPORTANTE:  esse mock vai nos permitir manipular a nossa base de dados "Mock Tranactions"

let transactionsDb: MockTransaction[] = [...mockTransactions];

export function getTransactionsDb(){
    return transactionsDb
}

export function addTransaction(transaction: MockTransaction) {
    transactionsDb.unshift(transaction);
}

export function clearTransactions() {
    transactionsDb = [];
}

export function resetTransactions() {
    transactionsDb = [...mockTransactions];
}