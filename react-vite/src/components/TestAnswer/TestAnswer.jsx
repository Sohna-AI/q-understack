import { useEffect, useState } from "react"

function TestAnswer() {
    const [response, setResponse] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const newAnswer = async () => {
            const data = await fetch("/api/questions/1/answers",
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: "hello"
                    })
                })
                .then(() => setIsLoaded(true))
            setResponse(data)
        }
        newAnswer()
    }, [])


    return (<>
        {isLoaded &&
            <>
                {response?.text ?
                    <h1>{response.text}</h1> :
                    <h1>no text found</h1>}
            </>
        }
    </>)
}

export default TestAnswer;
