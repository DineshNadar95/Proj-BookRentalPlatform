import React, { useState } from 'react';
import '../App.js';
import axios from 'axios';
import noImage from '../images/noImage.jpg';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const BooksList = () => {

    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [apiKey] = useState("AIzaSyBHkfv6A8jL9cw8Eu6yKP-qvFt6Y9XuTg4");
    const [startIndex, setStartIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMoreRecords, setHasMoreRecords] = useState(false);
    const [moreRecords, setMoreRecords] = useState([]);

    function searchBooks() {
        const book = document.getElementById("search-box").value;
        setBook(book);
    }

    function loadMoreRecords(event) {
        searchBooksSubmit(event, true);
    }

    async function searchBooksSubmit(event, loadMoreEvent) {
        event.preventDefault();
        setLoading(true);
        if (!loadMoreEvent) {
            setHasMoreRecords(false);
            setStartIndex(0);
            setMoreRecords([]);
            setResult([]);
        } else {
            setStartIndex(startIndex + 40);
        }
        const filter = document.getElementById("books-type").value;
        const orderBy = document.getElementById("book-sort-by").value;
        const url = "https://www.googleapis.com/books/v1/volumes?filter=" + filter + "&orderBy=" + orderBy + "&startIndex=" + startIndex + "&maxResults=40&q=" + book + "&key=" + apiKey;
        console.log(url);

        try {
            await axios.get(url)
                .then(data => {
                    setLoading(false);
                    if (data.data.items && data.data.items.length > 0) {
                        data.data.items.map(book => {
                            if (book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                                book.image = book.volumeInfo.imageLinks.thumbnail;
                            } else {
                                book.image = noImage;
                            }
                        })
                        if (loadMoreEvent && startIndex > 0) {
                            setMoreRecords(data.data.items)
                        } else {
                            setMoreRecords([]);
                            setResult(data.data.items);
                        }
                        setHasMoreRecords(true);
                    } else {
                        setHasMoreRecords(false);
                    }
                })
        } catch (e) {
            setLoading(false);
            alert("Daily API limit exceeded!");
        }
    }

    return (
        <div>
            <br />
            <Container fluid>
                <h1 className="text-center">SEARCH BOOKS</h1>
                <hr />
                <Row className="justify-content-md-center" xs={1} md={1} lg={1}>
                    <form onSubmit={searchBooksSubmit}>
                        <div className="input-group">
                            <Col md={4} xs={3} lg={7} className="align-center">
                                <input type="text" onChange={searchBooks} id="search-box" className="form-control" placeholder="Search" required />
                            </Col>
                            <Col className="align-center">
                                <select id="books-type" className="custom-select mr-sm-2" onChange={searchBooks} >
                                    <option value="full" title="Only returns results where all of the text is viewable">FULL</option>
                                    <option value="partial" title="Returns results where at least parts of the text are previewable">PARTIAL</option>
                                    <option value="free-ebooks" title="Only returns results that are free Google eBooks">FREE EBOOKS</option>
                                    <option value="paid-ebooks" title="Only returns results that are Google eBooks with a price">PAID EBOOKS</option>
                                    <option value="ebooks" title="Only returns results that are Google eBooks, paid or free">EBOOKS</option>
                                </select>
                            </Col>
                            <Col className="align-center">
                                <select id="book-sort-by" className="custom-select mr-sm-2" onChange={searchBooks}>
                                    <option value="relevance">RELEVANCE</option>
                                    <option value="newest">NEWEST</option>
                                </select>
                            </Col>
                            <Col className="align-center">
                                <button type="submit" className="btn btn-success">SEARCH</button>
                            </Col>
                        </div>
                    </form>
                    <br />

                </Row>
            </Container>
            <hr />
            <div className="container float-center">
                <main className="row">
                    <div className="row">
                        {result.map(book => (
                            <div className="col-sm-5 col-md-4 col-lg-3" key={book.etag} >
                                <div className="hovereffect">
                                    <img src={book.image} className="rounded-0 border border-dark img-responsive" alt={book.volumeInfo.title} />
                                    <div className="overlay">
                                        <a className="info" target="_blank" href={`/book/${book.selfLink.split("/")[book.selfLink.split("/").length - 1]}`}>
                                            RATING : {book.volumeInfo.averageRating}
                                            <br />
                                            PAGES : {book.volumeInfo.pageCount}
                                            <br />
                                            PUBLISHED DATE : {book.volumeInfo.publishedDate}
                                        </a>
                                    </div>
                                    <div className="caption font-weight-bold">
                                        {book.volumeInfo.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {moreRecords.map(book => (
                            <div className="col-sm-5 col-md-4 col-lg-3" key={book.etag} >
                                <div className="hovereffect">
                                    <img src={book.image} className="rounded-0 border border-dark img-responsive" alt={book.volumeInfo.title} />
                                    <div className="overlay">
                                        <a className="info" href={`/book/${book.selfLink.split("/")[book.selfLink.split("/").length - 1]}`}>
                                            RATING : {book.volumeInfo.averageRating}
                                            <br />
                                            PAGES : {book.volumeInfo.pageCount}
                                            <br />
                                            PUBLISHED DATE : {book.volumeInfo.publishedDate}
                                        </a>
                                    </div>
                                    <div className="caption font-weight-bold">
                                        {book.volumeInfo.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="loading-image text-center">
                        <hr />
                        {loading ?<Spinner animation="border" role="status" size="lg"><span className="sr-only">LOADING...</span></Spinner> : ""}
                    </div>

                    <div id="add-more-records" className="loading-image text-center">
                        {hasMoreRecords ? <Button variant="warning" size="lg" onClick={loadMoreRecords}>LOAD MORE</Button> : moreRecords.length > 0 ? "No more records!" : ""}
                    </div>
                </main>
            </div>
            <br />
        </div >
    )
}

export default BooksList;