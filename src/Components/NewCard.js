import React, { useState, useEffect } from "react";
import { InputGroup, FormGroup, Button } from "@blueprintjs/core";


export function NewCard({ term, terms, index, setTerms}) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        setQuestion(term.question);
        setAnswer(term.answer);
    }, [terms]);

    const handleChangeTerm = (key, value) => {
        terms[index][key] = value;
        setTerms(terms);
    }

    const handleDelete = () => {
        terms.splice(index, 1);
        setTerms([...terms]);
    }
    return (
        <div className="flex flex-row pt-7 inline-block">
            <FormGroup helperText="Term" className={"w-full"}>
                <InputGroup
                    disabled={false}
                    className={"pr-5 w-full"}
                    fill={false}
                    large={true}
                    placeholder={"Enter term"}
                    value={question}
                    onChange={(e) => {
                        setQuestion(e.target.value);
                        handleChangeTerm("question", e.target.value);
                    }}
                />
            </FormGroup>
            <FormGroup helperText="Defintion" className={"w-full"}>
                <InputGroup
                    disabled={false}
                    large={true}
                    fill={false}
                    placeholder={"Enter definition"}
                    value={answer}
                    onChange={(e) => {
                        setAnswer(e.target.value);
                        handleChangeTerm("answer", e.target.value);
                    }}
                />
            </FormGroup>
            <div className="text-center pt-1 inline-block">
                <Button className="ml-5 " minimal={false} intent={"danger"} icon="trash" onClick={handleDelete}/>
            </div>
        </div>
    )
}