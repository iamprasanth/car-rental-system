import { useState, useEffect } from "react";
import api from "../../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import LexChat from "react-lex-plus";

import "./header.css";

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = (user && user.isAdmin);
    return (
        <>
            <div className="header">
                <div className="header__left">
                    <div className="header_text">
                        <Link to={isAdmin ? "/orders" : "/"} >
                            <span>Car Rental System {isAdmin ? " Admin Panel" : ""}</span>
                        </Link>
                    </div>
                    <LexChat
                        botName="carRentalSystem"
                        IdentityPoolId="us-east-1:f59cc61d-c76b-4d58-a724-c46eb03f8c95"
                        placeholder="Ask your query"
                        backgroundColor="#FFFFFF"
                        height={430}
                        region="us-east-1"
                        headerText="Chat with our bot"
                        headerStyle={{ backgroundColor: "#2e81f4", fontSize: "30px" }}
                        greeting={
                            "Hello, how can I help? I can give order details like your car info, service start date, service end date, total fare"
                        }
                    />
                    {/* <div className="title"><span>Login Form</span></div> */}
                    {/* <a href="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="" />
                    </a> */}
                    {/* <div className="header__input">
                        <span className="material-icons"> search </span>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />
                    </div> */}
                </div>
                {/* <div className="header__right">
                    <div className="header__info">
                        <a href="/myprofile">
                            <img className="user__avatar" alt="" />
                            <h4>{user && user.fullname}</h4>
                        </a>
                    </div>
                    <span className="material-icons"> expand_more </span>
                </div> */}
            </div>
        </>
    );
}
