import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';

const Home = () => {
    const [juegos, setJuegos] = useState([]);
    const { addToCart, formatNumber } = useCart();
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/juegos.json')
            .then(response => response.json())
            .then(data => setJuegos(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    return (
        <Container className="containerHome">
            <Row className="mb-4">
                <Col>
                    <Card className="bg-dark text-white">
                        <div className="banner-container">
                            <Card.Img src="./src/img/games3.jpg" className="imgBanner" alt="" />
                            <Card.ImgOverlay>
                                <div className="textBanner">
                                    <h1>Juegos para Nintendo Switch</h1>
                                    <h3>Descubre una amplia gama de juegos para la familia de consolas Nintendo Switch</h3>
                                </div>
                                <hr />
                            </Card.ImgOverlay>
                        </div>
                    </Card>
                </Col>
            </Row>  
            <Row>
                {juegos.map((juego) => (
                    <Col sm={12} md={6} lg={4} key={juego.id_juego} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={juego.url_imagen_juego} alt={juego.titulo} />
                            <Card.Body>
                                <Card.Title>{juego.titulo}</Card.Title>
                                <Card.Text>{juego.descripción}</Card.Text>
                                <hr />
                                <h5>Categoría</h5>
                                <ListGroup className="list-group-flush">
                                    {juego.categoría.map((category, index) => (
                                        <ListGroup.Item key={index}>
                                            <img src="./src/img/category.png" alt="" className="icontiny" /> {category}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <hr />
                                <div className="priceHome">
                                    <h2>${formatNumber(juego.precio)}</h2>
                                </div>
                                <div className="baseHome">
                                    <Button className="buttonText" variant="info" onClick={() => navigate(`/juego/${juego.id_juego}`)}>Ver Más  <img src="./src/img/eyes.png" alt="" className="icontiny" /></Button>
                                    <Button className="ms-2 buttonText" variant="danger" onClick={() => addToCart(juego)}>Añadir <img src="./src/img/shopping-cart.png" alt="" className="icontiny" /></Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
