import jwt_decode from "jwt-decode";

export const ACTIONS = {
    test: "TEST",
    fillJobDetails: "FILL_JOB_DETAILS",
    checkLoggedIn: "CHECK_IF_LOGGED_IN",
}

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.test:
            console.log("test")
            return state

        case ACTIONS.fillJobDetails:
            return {
                ...state,
                jobPostDetails: action.payload
            }

        case ACTIONS.checkLoggedIn:
            const token = localStorage.getItem('token')
            if (token) {
                const employer = jwt_decode(token)
                if (!employer) {
                    localStorage.removeItem('token')
                    return {
                        ...state,
                        isLoggedIn: false,
                        user: {}
                    }
                } else {
                    return {
                        ...state,
                        isLoggedIn: true,
                        user: {
                            name: employer.name,
                            email: employer.email,
                            id: employer.id,
                        }
                    }
                }

            } else {
                console.log("Token not found!")
                return {
                    ...state,
                    isLoggedIn: false,
                    user: {}
                }
            }
        default:
            break;
    }
}