

const Clicker = ()=> {
    const fireLasers = (e) => {
        console.log(e.currentTarget)
        console.log(e.nativeEvent)
    
        // console.log(e)
        // console.log("fired")
    }
    return (
        <>
            <button onClick={fireLasers}>CLICK ME!</button>
            <textarea rows="2">
                dfa adf ad
                adsf
                asdfaa
                dfg
            </textarea>
        </>
    )
}

export default Clicker