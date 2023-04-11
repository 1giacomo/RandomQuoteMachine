function App(){
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState([]);
    const [color, setColor] = React.useState("#e1c699");

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randIndex]);
        }
        fetchData();
    }, []);

    const getNewQuote = () => {
        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857",
        ];

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setRandomQuote(quotes[randIndex]);
        setColor(colors[randColorIndex]);
    };


    return (
        <div style={{ backgroundColor: color, minHeight: "100vh" }}>
            <div className="container pt-5">
                <div className="jumbotron p-5">
                    <div className="card">
                        <div id="quote-box" className="card-body m-5">
                            {randomQuote ? (
                                <>
                                <div id="text" className="d-flex flex-row">
                                    <i className="fa fa-quote-left fa-2x"></i>
                                    <p  className="card-text text-center ml-2" style={{ fontSize: 30 }}>{randomQuote.text}</p>
                                </div>
                                <h5 id="author" className="title" style={{textAlign: 'right'}}>
                                    - {randomQuote.author || "No author"}
                                </h5>
                                
                                </>
                            ) : (
                                <h2>Loading....</h2>
                            )}

                            <div className="d-flex flex-row">
                                <button id="new-quote" onClick={getNewQuote} className="btn btn-primary ml-3 mx-1">
                                    New Quote
                                </button>
                                <a
                                    id="tweet-quote"
                                    href={
                                        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                                        encodeURIComponent(
                                        '"' + randomQuote.text + '" ' + randomQuote.author
                                        )
                                    }
                                    target="_blank"
                                    className="btn btn-outline-primary mx-1">
                                        <i className="fa fa-twitter"></i>
                                </a>
                                <a
                                    href={
                                        "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                                        encodeURIComponent(randomQuote.author) +
                                        "&content=" +
                                        encodeURIComponent(randomQuote.text) +
                                        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                                    }
                                    target="_blank"
                                    className="btn btn-outline-primary mx-1">
                                    <i className="fa fa-tumblr"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'))
