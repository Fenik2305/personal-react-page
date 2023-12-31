import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (name, email, password) => {
        setIsLoading(true)
        setError(null)

        const responce = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, password })
        })
        const json = await responce.json()

        if (responce.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
               
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }

        if (!responce.ok) {
            setIsLoading(false)
            setError(json.error)
        }
    }

    return { signup, isLoading, error }
}