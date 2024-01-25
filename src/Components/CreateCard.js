import React, { useState } from "react";
import { InputGroup, Button, Spinner, SpinnerSize } from "@blueprintjs/core";
import { NewCard } from "./NewCard";
import { _toaster } from "./User";
import { api } from "../api";
import { Intent } from "./Home";

export const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function CreateCard({ userId }) {
    const [busy, setBusy] = useState(false);
    const [title, setTitle] = useState("");
    const [courseName, setCourseName] = useState("");
    const [terms, setTerms] = useState([]);
    const [titleWarning, setTitleWarning] = useState(Intent.NONE);
    const [courseWarning, setCourseWarning] = useState(Intent.NONE);

    const showMessage = (props) => {
        _toaster.show(props);
    };

    const handleAdd = () => {
        setTerms([...terms, {
            question: "",
            answer: ""
        }]);
    }

    const handleCreateCard = () => {
        if (terms.length > 0 && (terms[0].question !== "" && terms[0].answer !== "")) {
            terms.forEach((e, i) => {
                e["course"] = courseName;
                e["user_id"] = userId;
                e["set_name"] = title;
                e["card_id"] = "card_" + uuidv4();
            });
            if (courseName !== "" && title !== "") {
                setBusy(true);
                setCourseWarning(Intent.NONE);
                setTitleWarning(Intent.NONE);
                api.CreateCardSet(terms, userId).then((ev) => {
                    setTitle("");
                    setCourseName("");
                    setTerms([]);
                    showMessage({
                        message: "Study set created!",
                        intent: "success",
                        icon: "tick-circle"
                    })
                    setBusy(false);
                });
            } else {
                if (courseName === "") {
                    setCourseWarning(Intent.WARNING);
                } else {
                    setCourseWarning(Intent.NONE);
                }
                if (title === "") {
                    setTitleWarning(Intent.WARNING);
                } else {
                    setTitleWarning(Intent.NONE);
                }
                showMessage({
                    message: "Please fill in course and title",
                    intent: Intent.WARNING,
                    icon: "tick-circle"
                })
            }
        } else {
            showMessage({
                message: "Please fill in at least one card",
                intent: Intent.DANGER,
                icon: "tick-circle"
            })
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="justify-center align-center w-1/2">
                <div className="text-center pb-5">Create a new study set</div>
                <div className="text-center pb-5 flex flex-row inline-block">
                    <InputGroup
                        disabled={false}
                        large={true}
                        intent={titleWarning}
                        className={"pr-5 w-full"}
                        fill={false}
                        placeholder={"Enter a title, like Biology - Chapter 22: Evolution"}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <InputGroup
                        disabled={false}
                        large={true}
                        fill={false}
                        intent={courseWarning}
                        className={"w-full"}
                        placeholder={"Course"}
                        value={courseName}
                        onChange={(e) => {
                            setCourseName(e.target.value);
                        }}
                    />
                </div>
                <hr className="border-1 border-black mt-2" />
                <>
                    {
                        terms.map((o, i) => {
                            return <div key={i}>
                                <NewCard
                                    term={o}
                                    terms={terms}
                                    index={i}
                                    setTerms={setTerms}
                                />
                            </div>
                        })
                    }
                </>
                {terms.length < 25 &&
                    <Button fill={true} className="h-[5vh] mt-4 rounded-md text-center justify-center" minimal={false} intent={"success"} icon="plus" onClick={handleAdd} text={"Add Card"} />
                }
                {busy ? <Spinner className="mt-5" size={SpinnerSize.SMALL} /> : null}
                <div className="text-center create-button pt-5 justfiy">
                    <Button disabled={busy} large={true} fill={true} text={"Create"} intent={"primary"} onClick={handleCreateCard} />
                </div>
            </div>
        </div>
    );
}