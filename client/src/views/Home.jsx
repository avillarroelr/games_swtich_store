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
    // Declarando estado para guardar info de pizzas 
    const [pizzas, setPizzas] = useState([]);
    // Importando funciones del context para agregar pizza al carrito y dar fomato a valores
    const { addToCart, formatNumber } = useCart();
    let navigate = useNavigate();

    // Consumiendo api local y agregando tratamiento de errores 
    useEffect(() => {
        fetch('/pizzas.json')
            .then(response => response.json())
            .then(data => setPizzas(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    // Renderizando banner y las cards con info de las pizzas con react-bootstrap y map
    return (
        <Container className="containerHome">
            <Row className="mb-4">
                <Col>
                    <Card className="bg-dark text-white">
                        {/* Envuelve la imagen y el texto en un nuevo contenedor */}
                        <div className="banner-container">
                            <Card.Img src="./src/img/games4.jpg" className="imgBanner" alt="" />
                            <Card.ImgOverlay>
                                <div className="textBanner">
                                    <h1>¡Pizzería Mamma Mía!</h1>
                                    <h3>¡Tenemos las mejores pizzas que puedas encontrar!</h3>
                                </div>
                                <hr />
                            </Card.ImgOverlay>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                {pizzas.map((pizza) => (
                    <Col sm={12} md={6} lg={4} key={pizza.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
                            <Card.Body>
                                <Card.Title>{pizza.name}</Card.Title>
                                <Card.Text>{pizza.desc}</Card.Text>
                                <hr />
                                <h5>Ingredientes</h5>
                                <ListGroup className="list-group-flush">
                                    {pizza.ingredients.map((ingredient, index) => (
                                        <ListGroup.Item key={index}>
                                            <img src="./src/img/pizza.png" alt="" className="icontiny" /> {ingredient}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <hr />
                                <div className="priceHome">
                                    <h2>${formatNumber(pizza.price)}</h2>
                                </div>
                                <div className="baseHome">
                                    <Button className="buttonText" variant="info" onClick={() => navigate(`/pizza/${pizza.id}`)}>Ver Más  <img src="./src/img/eyes.png" alt="" className="icontiny" /></Button>
                                    <Button className="ms-2 buttonText" variant="danger" onClick={() => addToCart(pizza)}>Añadir <img src="./src/img/shopping-cart.png" alt="" className="icontiny" /></Button>
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




