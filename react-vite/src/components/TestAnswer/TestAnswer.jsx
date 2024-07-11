import { useEffect, useState } from "react"

function TestAnswer() {
    const [response, setResponse] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const newAnswer = async () => {
            const data = await fetch("/api/questions/1")
                .then(setIsLoaded(true))
            setResponse(data)
        }
        newAnswer()
    }, [])


    return (<>
        {isLoaded && <>
            {response && <p>{response.title}</p>}
        </>
        }
    </>
    )
}

export default TestAnswer;
