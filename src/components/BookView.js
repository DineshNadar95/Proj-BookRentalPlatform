import React, { useState, useEffect } from 'react';
import '../App.js';
import axios from 'axios';
import noImage from '../images/noImage.png';

const BookView = (props) => {
    let table = null, priceTag, caption;
    const [book, setBook] = useState(undefined);
    useEffect(() => {
        async function fetchBook() {
            try {
                const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes/${props.match.params.id}`)
                setBook(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchBook();
    }, [props.match.params.id])

    if (book) {
        if (book.volumeInfo.authors && book.volumeInfo.authors.length > 0) {
            let authors = [];
            for (let i = 0; i < book.volumeInfo.authors.length; i++) {
                authors.push(book.volumeInfo.authors[i])
                if (i < book.volumeInfo.authors.length - 1)
                    authors.push(", ");
            }
            book.authors = authors;
        }
        if (book.volumeInfo.categories && book.volumeInfo.categories.length > 0) {
            let categories = [];
            for (let i = 0; i < book.volumeInfo.categories.length; i++) {
                categories.push(book.volumeInfo.categories[i])
                if (i < book.volumeInfo.categories.length - 1)
                    categories.push(", ");
            }
            book.categories = categories;
        }
        if (book.saleInfo.listPrice && book.saleInfo.listPrice.amount) {
            book.listPrice = book.saleInfo.listPrice.amount;
        }
        if (book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount) {
            book.retailPrice = book.saleInfo.retailPrice.amount + " " + book.saleInfo.retailPrice.currencyCode;
        }
        if (book.listPrice && book.retailPrice) {
            priceTag = <div className="row"><div className="heading col">PRICE : </div>
                <div className="col text-left">
                    <strike>{book.listPrice} </strike>&nbsp;&nbsp;{book.retailPrice} &nbsp;&nbsp;&nbsp;
                        <a href={book.saleInfo.buyLink} rel="noopener noreferrer" className="heading white" target="_blank" >BUY</a></div></div>
        }

        if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
            book.image = book.volumeInfo.imageLinks.thumbnail;
        } else {
            book.image = noImage;
        }

        if (book.volumeInfo.description) {
            book.description = book.volumeInfo.description;
        } else {
            book.description = '';
        }

        if (book.saleInfo.saleability === "FREE") {
            caption = <div className="caption">
                <a href={book.accessInfo.webReaderLink} rel="noopener noreferrer" target="_blank">
                    <div className="heading">OPEN BOOK</div>
                </a>
            </div>
        } else if (book.saleInfo.saleability === 'NOT_FOR_SALE') {
            caption = <div className="caption">
                <a href={book.accessInfo.webReaderLink} rel="noopener noreferrer" target="_blank">
                    <div className="heading">OPEN SAMPLE</div>
                </a>
                <div className="heading">({book.saleInfo.saleability})</div>
            </div>
        } else {
            caption = <div className="caption">
                <a href={book.accessInfo.webReaderLink} rel="noopener noreferrer" target="_blank">
                    <div className="heading">OPEN SAMPLE</div>
                </a>
            </div>
        }

        table = <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th className="text-center book">{book.volumeInfo.title}</th>
                    <th className="text-center">BOOK DETAILS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center">
                        <img alt="<IMG NOT AVAILABLE>" src={book.image} />
                        {caption}
                    </td>

                    <td className="table-info">
                        <div className="row"><div className="heading col">TITLE: </div> <div className="col text-left">{book.volumeInfo.title}</div></div>
                        <hr />
                        <div className="row"><div className="heading col">AUTHORS: </div> <div className="col text-left">{book.authors}</div></div>
                        <hr />
                        {priceTag}
                        <hr />
                        <div className="row"><div className="heading col">DESCRIPTION:</div> <div className="col text-left">{book.description.replace(/(<([^>]+)>)/ig, '')}</div></div> <hr />
                        <div className="row"><div className="heading col">PUBLISHER: </div> <div className="col text-left">{book.volumeInfo.publisher}</div></div><hr />
                        <div className="row"><div className="heading col">PUBLISHED DATE: </div> <div className="col text-left">{book.volumeInfo.publishedDate}</div></div><hr />
                        <div className="row"><div className="heading col">PAGE COUNT: </div> <div className="col text-left">{book.volumeInfo.pageCount}</div></div><hr />
                        <div className="row"><div className="heading col">CATEGORIES: </div> <div className="col text-left">{book.categories}</div></div><hr />
                        <div className="row"><div className="heading col">AVERAGE RATING: </div> <div className="col text-left">{book.volumeInfo.averageRating}</div></div><hr />
                        <div className="row"><div className="heading col">LANGUAGE: </div> <div className="col text-left">{book.volumeInfo.language}</div></div>
                    </td>
                </tr>
            </tbody></table>

        return (
            <div className='book-view'>
                {table}
            </div>
        );
    } else {
        return (
            <div className='App-body'>
                <h3 className="app-title"> BOOK NOT FOUND !! </h3>
            </div>
        );
    }
}

export default BookView;