module.exports = {
    BAD_PARAMETER_URL: {
        code: 1001,
        error: "Check parameter in url. It must not be null or empty"
    },
    BAD_BODY_PARAMETER: {
        code: 1002,
        error: "Check body parameter. It must not be null or empty"
    },
    PASSWORD_TOO_SHORT: {
        code: 1003,
        error: "Password is too short. Minimum : 7 characters"
    },
    EMAIL_NOT_VALID: {
        code: 1004,
        error: "Email is not valid"
    },
    FILE_NOT_UPLOAD: {
        code: 1005,
        error: "File is not upload"
    },
    USER_ALREADY_EXISTS: {
        code: 2001,
        error: "User already exists"
    },
    USER_HAS_NOT_BEEN_REMOVED: {
        code: 2002,
        error: "User has not been removed"
    },
    USER_NOT_FOUND: {
        code: 2003,
        error: "User not found"
    },
    USER_AVATAR_NOT_FOUND: {
        code: 2004,
        error: "User have not avatar"
    },
    CATEGORY_NOT_FOUND: {
        code: 3001,
        error: "Category not found"
    },
    CATEGORY_USED_BY_EVENTS: {
        code: 3002,
        error: "Category is used by events"
    },
    CATEGORY_REMOVED_FAILLED: {
        code: 3002,
        error: "Cannot to remove category"
    }
};