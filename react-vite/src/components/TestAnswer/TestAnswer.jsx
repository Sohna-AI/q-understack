import { useEffect, useState } from "react"

function TestAnswer() {
    const [response, setResponse] = useState({})

    useEffect(() => {
        const newAnswer = async () => {
            const data = await fetch("/api/questions/1/answers",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        text: "hello"
                    })
                })
            setResponse(data)
        }
        newAnswer()
    }, [])


    return (<>
        {if response?.text && <h1>{response}</h1>}
    </>
    )
}

export default TestAnswer;
