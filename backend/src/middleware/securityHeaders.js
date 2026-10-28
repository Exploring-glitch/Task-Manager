// Small set of hardening headers. Kept dependency free on purpose so the
// deployment does not need extra packages just for this.
export const securityHeaders = (req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
    next();
};
