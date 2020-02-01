import React, { Component } from 'react';
//import { Bootstrap, Grid, Row, Col } from 'react-bootstrap';

import "./styles/Home.css";

import Fiction from "./SVG/Fiction.svg";
import History from "./SVG/History.svg";
import Drama from "./SVG/Drama.svg";
import Humour from "./SVG/Humour.svg";
import Politics from "./SVG/Politics.svg";
import Philosophy from "./SVG/Philosophy.svg";
import Next from "./SVG/Next.svg";
import Adventure from "./SVG/Adventure.svg"
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { title: "fiction" },
                { title: "philosophy" },
                { title: "drama" },
                { title: "history" },
                { title: "humour" },
                { title: "adventure" },
                { title: "politics" }
            ]
        };
    }

    getIcon = (value) => {
        if (value === "fiction") {
            return Fiction;
        } else if (value === "philosophy") {
            return Philosophy;
        } else if (value === "drama") {
            return Drama;
        } else if (value === "history") {
            return History;
        } else if (value === "humour") {
            return Humour;
        } else if (value === "adventure") {
            return Adventure;
        } else {
            return Politics;
        }
    }

    getBooks = (value) => (events) => {
        console.log(value);
        this.props.history.push(`/Book/${value}`);
    }
    render() {
        return (
            <div>
                <div className="maincontainer">
                    <div>
                        <h1 className="main-txt"> Gutenberg Project</h1>
                        <p className="description-txt">A social cataloging website that allow you to freely  search its database of books, annotations, and reviews. </p>
                    </div>
                    <div className="main">
                        {
                            this.state.data.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <div className="tags" onClick={
                                            this.getBooks(data.title)
                                        }>
                                            <div>
                                                <img className="icons" src={this.getIcon(data.title)} alt={data.title} />
                                            </div>
                                            <div className="heading">
                                                {data.title}
                                            </div>
                                            <div>
                                                <img className="next" src={Next} alt="Next" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )

    }
}

export default Home;