import { SignupListener } from "src/listeners/signup-listener";

export class SignupEvent {

    constructor(data, signupListerner){
        signupListerner.saveSignup(data);
    }
}