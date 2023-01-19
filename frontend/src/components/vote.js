import { useEffect, useRef } from 'react'

const Vote = ({ choice, currentIp, setVote }) => {

    const counter = useRef(0);
    useEffect(() => {
        counter.current++;
    })

    return (
        <>
            {choice && currentIp && 
                <>
                votes: {choice.numOfVotes}
                current user Ip { currentIp.current }
                </>
            }
        </>
    )
}

export default Vote;
