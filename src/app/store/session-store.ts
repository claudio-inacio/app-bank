import { useState } from "react"


export const useSessionstore = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(true);


    return isAuthenticated
}