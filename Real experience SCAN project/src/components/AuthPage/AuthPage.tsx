import React from "react";
import '../../styles/AuthPage.scss';
import AuthPicture from "./AuthPicture";
import AuthComponent from "./AuthComponent";
import Lock from "./Lock";


interface Props {}
const AuthPage: React.FC<Props> = (props) => {
    return (
        <div className="auth-content">
            <div className="auth-left_side-content">
                <div className="auth-title">
                    <h1>To subscribe to the tariff you must log in.</h1>
                </div>
                <div className="auth-image">
                    <AuthPicture alt="Auth page picture" />
                </div>
            </div>
            <div className="auth-form">
                {/*<div className="lock_pic">*/}
                {/*    <Lock alt="lock pic"/>*/}
                {/*</div>*/}
                <AuthComponent/>
            </div>
        </div>
    )
}

export default AuthPage;