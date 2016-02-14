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
    OBJECT_ID_NOT_VALID: {
        code: 1006,
        error: "ID is not valid"
    },
    DATE_NOT_VALID: {
        code: 1007,
        error: "This date is not valid"
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
        code: 3003,
        error: "Cannot to remove category"
    },
    CATEGORY_ALREADY_EXISTS: {
        code: 3004,
        error: "Category already exists"
    },
    CATEGORY_USER_NOT_CREATOR: {
        code: 3005,
        error: "User is not creator of this category"
    },
    EVENT_ALREADY_EXISTS: {
        code: 4001,
        error: "Event already exists"
    },
    EVENT_NOT_FOUND: {
        code: 4002,
        error: "Event not found"
    },
    EVENT_USER_NOT_CREATOR: {
        code: 4003,
        error: "User is not creator of this event"
    },
    EVENT_REMOVED_FAILLED: {
        code: 4004,
        error: "Cannot to remove event"
    },
    EVENT_AVATAR_NOT_FOUND: {
        code: 4005,
        error: "Event have not logo"
    },
    EVENT_USER_NOT_CREATOR_SUBSCRIBE_USER: {
        code: 4006,
        error: "Cannot to added another user because you are not creator"
    },
    EVENT_USER_ALREADY_SUBSCRIBE: {
        code: 4007,
        error: "By default, creator is added"
    },
    EVENT_MEMBER_ALREADY_SUBSCRIBE: {
        code: 4008,
        error: "This member is already addedd"
    },
    EVENT_USER_NOT_CREATOR_UNSUBSCRIBE_USER: {
        code: 4009,
        error: "Cannot to remove another user because you are not creator"
    },
    EVENT_USER_CREATOR_UNSUBSCRIBE: {
        code: 4010,
        error: "Impossible to remove the creator"
    },
    EVENT_USER_NOT_MEMBER: {
        code: 4011,
        error: "This user is not a member of this event"
    }
};