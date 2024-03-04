import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setEror] = useState('');

    const fetching = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e) {
            setEror(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}