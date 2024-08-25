export const rbacConfig = {
    owner: [
        "/get-started",
        "/owner-dashboard"        
    ],
    manager: [
        "/manager-dashboard"
    ],
    employee: [
        "/employee-dashboard"
    ],
    admin: [
        "/admin-dashboard"
    ]
} as const;

export type Role = keyof typeof rbacConfig;