"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupEvent = void 0;
class SignupEvent {
    constructor(data, signupListerner) {
        signupListerner.saveSignup(data);
    }
}
exports.SignupEvent = SignupEvent;
//# sourceMappingURL=signup-event.js.map