import { handlers } from "./handlres";
import { setupServer } from "msw/node";


export const server = setupServer(...handlers)