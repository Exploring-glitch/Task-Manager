const AuthError = ({ message }) => {
    if (!message) return null;

    return (
        <div
            role="alert"
            className="mb-4 rounded-md border border-[#FECDD3] bg-[#FFF1F2] p-2 text-sm text-[#E11D48] sm:p-3"
        >
            {message}
        </div>
    );
};

export default AuthError;
