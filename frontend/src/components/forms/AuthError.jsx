import { LuCircleAlert } from "react-icons/lu";

const AuthError = ({ message }) => {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200/80 bg-rose-50 px-3.5 py-3 text-sm text-rose-700"
        >
            <LuCircleAlert className="mt-0.5 text-base shrink-0" aria-hidden="true" />
            <span className="leading-5">{message}</span>
        </div>
    );
};

export default AuthError;
