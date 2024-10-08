import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
// import { deleteBook } from '../utils/API';


const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  const [removeBook, {removeError, removeData}] = useMutation(REMOVE_BOOK);
  
    // let { id } = useParams();
    // console.log("Here");
    let id = Auth.getProfile().data._id;
    // console.log(id);
    const {loading, data} = useQuery(GET_ME);
      // , { variables: {_id: id}}
    



  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);
      // const response = useMutation(REMOVE_BOOK, {variables: {token: bookId}})
      try{
        const deleteUser = await removeBook({
          variables: {id: id, bookId: bookId}
        });
        setUserData(deleteUser);
        removeBookId(bookId);
      }
      catch(err){
        console.log(err)
      }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // removeBookId(bookId);
    } catch (err) {
      console.log(err);
    }
  };

  // if data isn't here yet, say so
  // if (loading) {
  //   // console.log("Loading");
  //   return <h2>LOADING...</h2>;
  // }
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(id);
  setUserData(data);
  console.log(data);

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId} >
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
