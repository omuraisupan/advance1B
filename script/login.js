import {loginCheck} from "Login";
import {createAccountCheck} from "CreateAccount";

function login(userID,password){
    let _loginCheck=loginCheck();
    return _loginCheck;
}

function createAccount(userID,password){
    let _createAccountCheck=createAccountCheck();
    return _createAccountCheck;
}
