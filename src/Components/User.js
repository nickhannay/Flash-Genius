import React, { useState, useEffect } from "react";
import { InputGroup, FormGroup, Button, Icon, Toaster } from "@blueprintjs/core";
import { api } from "../api";
import { uuidv4 } from "./CreateCard";

export const _toaster = Toaster.create({
    position: "top",
    className: "z-[120]"
});

export function User({ userID, signOut, activeTab }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // TODO: Query the use database to set the user infomation above
        api.GetCurrentUserInfo(userID)
        .then((data) => {
            if (!Array.isArray(data.body)) {
                console.log("Returned from GetCurrentUserInfo(), data = ", data);
                setFirstName(data.body.given_name);
                setLastName(data.body.family_name);
                setUserName(data.body.user_id);
                setEmail(data.body.email);   
            }
        })
        .catch((err) => console.log(err));
    }, [userID, activeTab])

    return (
        <div className="flex pt-5 justify-center w-full">
            <div className="bg-white rounded-md drop-shadow-lg min-h-[calc(100vh-200px)] min-w-[calc(100vh-200px)] text-center">
                <div className="flex pt-5 justify-center w-full">
                    <div className="">
                        <Icon className="mt-5" icon="User" size={100} />
                    </div>
                </div>
                <div className="pt-3 flex justify-center">
                    <FormGroup label={<span className="font-semibold">First Name:</span>}>
                        <h5 className="text-xl font-semibold">{firstName}</h5>
                    </FormGroup>
                </div>
                <div className="flex justify-center">
                    <FormGroup label={<span className="font-semibold">Last Name:</span>}>
                        <h5 className="text-xl font-semibold">{lastName}</h5>
                    </FormGroup>
                </div>
                <div className="flex justify-center">
                    <FormGroup label={<span className="font-semibold">User Name:</span>}>
                        <h5 className="text-xl font-semibold">{userName}</h5>
                    </FormGroup>
                </div>
                <div className="flex justify-center">
                    <FormGroup label={<span className="font-semibold">Email:</span>}>
                        <h5 className="text-xl font-semibold">{email}</h5>
                    </FormGroup>
                </div>
                <div className="pt-5 flex justify-center">
                    <br />
                    <Button
                        intent={"primary"}
                        text="Sign Out"
                        onClick={signOut}
                        className="border"
                        style={{ width: "50%" }}
                    />
                    <br />
                </div>
                <br />
            </div>
        </div>
    )
}