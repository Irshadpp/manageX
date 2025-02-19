export const rbacConfig = {
    owner: [
        "/get-started",
        "/email-verified",  
        "/owner",
        "/employees"
    ],
    manager: [
        "/manager",
    ],
    employee: [
        "/email-verified",
        "/set-password",
        "/employee",
        "/attendance"
    ],
    admin: [
        "/admin",
        "/organizations"
    ]
} as const;

export type Role = keyof typeof rbacConfig;
