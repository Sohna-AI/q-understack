import { useSelector } from "react-redux";
import QuestionListPage from '../QuestionListPage';

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