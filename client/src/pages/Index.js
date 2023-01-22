import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMetamask } from 'use-metamask';
const Index = () => {
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(window.ethereum == undefined ? false : true)
    const { connect, metaState } = useMetamask();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMetamaskInstalled) {
            navigate("/install-metamask")
        } else if (metaState.isConnected) {
            navigate("/home")
        } else {
            navigate("/connect-wallet")
        }
    }, [])

    return (
        <div>Index page</div>
    )
}

export default Index