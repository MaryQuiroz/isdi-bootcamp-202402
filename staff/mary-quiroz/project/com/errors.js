function buildErrorClass(name) {
    return class extends Error {
        constructor(message) {
            super(message);
            this.name = name;
        }
        // @ts-ignore
        static get name() {
            return name;
        }
    };
}
const ContentError = buildErrorClass('ContentError');
const SystemError = buildErrorClass('SystemError');
const DuplicityError = buildErrorClass('DuplicityError');
const CredentialsError = buildErrorClass('CredentialsError');
const NotFoundError = buildErrorClass('NotFoundError');
const UnauthorizedError = buildErrorClass('UnauthorizedError');
const JsonWebTokenError = buildErrorClass('JsonWebTokenError');
const InvalidObjectIdError = buildErrorClass('InvalidObjectIdError');
const errors = {
    ContentError,
    SystemError,
    DuplicityError,
    CredentialsError,
    NotFoundError,
    UnauthorizedError,
    JsonWebTokenError,
    InvalidObjectIdError
};
export { ContentError, SystemError, DuplicityError, CredentialsError, NotFoundError, UnauthorizedError, JsonWebTokenError, InvalidObjectIdError };
export default errors;
