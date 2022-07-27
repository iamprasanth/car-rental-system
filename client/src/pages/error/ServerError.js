import "./error.css";

export const NotFound = ({ }) => {

    return (
        <>
            <div className="not-found">
                <h1>Woops!!!</h1><br />
                <h2>Something went wrong</h2><br />
                <p>The Page you are looking for doesn't exist or an other error occured. Go to <a href="/">Home Page.</a></p>
            </div>

        </>
    )
}

export default NotFound
