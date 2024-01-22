import {useSessionStorage} from "usehooks-ts";

export function useErrors() {
    const [errors, setErrors] = useSessionStorage<string[]>('errors', []);
    const addError = (error: string) => {
        setErrors([...errors, error]);
    };
    const clearErrors = () => {
        setErrors([]);
    };
    return {
        errors,
        addError,
        clearErrors
    };
}