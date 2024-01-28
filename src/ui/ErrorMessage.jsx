
const styles ={
    color:"red",
    fontWeight:100

}


function ErrorMessage({children}) {

    return (
        <p style={styles}>{children}</p>
    )
}

export default ErrorMessage
