import { useSearchParams } from "next/navigation";

export const LoginError = () => {
    const params = useSearchParams();
    const error = params.get("error");
    return (
        error && <p className="text-red-600 capitalize text-center">{error}</p>
    );
};
