import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionListPage from '../QuestionListPage';
import { thunkGetAllQuestions } from '../../redux/questions';

export default function LandingPage() {
    const sessionUser = useSelector((state) => state.session.user);

    let content;

    if (!sessionUser) {
        content = <h1>Hello There</h1>
    } else {
        content = (
            <QuestionListPage
                homePage={true}
            />
        )
    }


    return (
        <>
            {content}
        </>
    )
}