export const HEADER = {
    defaultHeader: () => ({
        "Content-Type": "application/json",
    }),
}

export const endPoint = {
    auth: {
        login: () => ({
            url: "api/auth/login",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
    },

    users: {
        getAll: () => ({
            url: "api/user/all-employee",
            method: "GET",
            headers: HEADER.defaultHeader(),
        }),
    }
}