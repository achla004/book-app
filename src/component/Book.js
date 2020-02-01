import React, { Component } from 'react';
import DefaultCover from "./SVG/defaultCover.png"
import "./styles/Book.css";

import Back from "./SVG/Back.svg";
import { debounce } from "lodash";
import 'bootstrap/dist/css/bootstrap.css';
class Book extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            query: null,
            result: [],
            result1: [],
            result2: [],
            img: DefaultCover,
            isLoading: false,
            isLoading1: false,
            message: "",
        })

    }

    componentDidMount() {
        fetch(`http://skunkworks.ignitesol.com:8000/books?topic=${this.props.match.params.keyword}`)
            .then(results => {
                return results.json();
            }).then(data => {
                console.log(data);
                this.setState({
                    isLoading: true,
                    result1: data,
                    result: data.results
                })
            })
        this.handleScroll();


    };

    handleScroll = () => {
        window.onscroll = debounce(() => {
            if (this.state.isLoading) {
                if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                    if (this.state.result1.next !== null) {
                        var next = this.state.result1.next;
                        console.log(next);
                        fetch(`${next}`)
                            .then(res => {
                                return res.json();
                            })
                            .then((data2) => {
                                this.setState({
                                    isLoading2: true,
                                    result1: data2,
                                    result2: data2.result
                                });

                                if (this.state.isLoading2) {

                                    this.setState({
                                        result: this.state.result.concat(this.state.result2)
                                    });

                                    console.log(this.state.result2);
                                }
                            })
                    }
                }
            }
        }, 1000);
    }


    previousPage = (event) => {
        this.props.history.push(`/`);
    }


    searchBook = debounce((query) => {
        this.setState({ query }
        );

        fetch(`http://skunkworks.ignitesol.com:8000/books/?search=${this.state.query}`)
            .then(results => {
                return results.json();
            }).then(data => {

                this.setState({
                    isLoading1: true,
                    result: data.results,
                })
                console.log(this.state.result);

            });
    }, 500)

    bookInformation = (item) => {

        console.log(item);
        const Type1 = item["text/html; charset=utf-8"];
        const type2 = item["application/pdf"];
        const type3 = item["text/plain; charset=us-ascii"];
        const type4 = item["text/plain; charset=utf-8"];


        if (Type1 !== undefined) {
            const ifzip1 = Type1.match(/zip/gi);
            if (ifzip1 === null) {
                window.open(Type1);
                console.log("type1");
            } else if (type2 !== undefined) {
                const ifzip2 = type2.match(/zip/gi);
                if (ifzip2 === null) {
                    window.open(type2);
                    console.log("type2");
                } else if (type3 !== undefined) {
                    const ifzip3 = type3.match(/zip/gi);
                    if (ifzip3 === null) {
                        window.open(type3);
                        console.log("type3");
                    } else if (type4 !== undefined) {
                        window.open(type4);
                        console.log("type4");
                    } else {
                        alert("The book you want is not available")
                    }
                }
            }
        } else {
            alert("The book you want is not available");
        }

    }






    render() {
        const { query } = this.state;
        if (!this.state.isLoading) {
            return (

                <div className="load">
                    <p>Loading</p>
                </div>
            )
        } else {

            return (
                <div>
                    <div className="backBox">
                        <div className="container box">
                            <img className="back" src={Back} alt="Back" onClick={() => this.previousPage()} />
                            <p className="content">{this.props.match.params.keyword}</p>
                        </div>


                        <div className="container search"  >
                            <input
                                className="container searchbox"
                                onChange={(event) => this.searchBook(event.target.value)}
                                type="text"
                                value={query}
                                name="query"
                                placeholder=" search"
                            />
                        </div>
                    </div>
                    <div className="test">
                        <div className="container bookContainer">
                            {
                                this.state.result.map((item, index) => {

                                    return (
                                        <div className="bookCover" key={index}>
                                            <div onClick={() => { this.bookInformation(item.formats) }}>
                                                <img className="bookImage" src={item.formats["image/jpeg"] ? item.formats["image/jpeg"]
                                                    : this.state.img} alt="" />
                                            </div>
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className="author">
                                                {item.authors[0].name}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }

    }
}

export default Book;