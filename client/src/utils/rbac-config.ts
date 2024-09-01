export const rbacConfig = {
    owner: [
        "/get-started",
        "/owner",
        "/employees"
    ],
    manager: [
        "/manager"
    ],
    employee: [
        "/employee"
    ],
    admin: [
        "/admin",
        "/organizations"
    ]
} as const;

export type Role = keyof typeof rbacConfig;