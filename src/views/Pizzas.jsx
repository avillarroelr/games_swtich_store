import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Card, Button, Row, Col, Container, ListGroup } from 'react-bootstrap';
import '../index.css';

const Pizzas = () => {
    // Creando estado para el id de la pizza selecionada 
    let { id } = useParams();
    const [pizza, setPizza] = useState(null);
    // Importando funciones del context para agregar al carrito y dar formato a totales
    const { addToCart, formatNumber } = useCart();
    // COnsultando info de la pizza con api local 
    useEffect(() => {
        fetch('/pizzas.json')
            .then(response => response.json())
            .then(data => {
                const foundPizza = data.find(p => p.id === id);
                setPizza(foundPizza);
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!pizza) return <Container>Cargando...</Container>;
    // Renderizando información de pizza seleccionada en tarjeta react-bootstrap
    return (
        <Container className='containerPizzas'>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="mb-3">
                        <Row className="g-0">
                            <Col md={4}>
                                <Card.Img variant="top" src={pizza.img} className='pizzasImageCard'/>
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title>{pizza.name}</Card.Title>
                                    <Card.Text>
                                        {pizza.desc}
                                    </Card.Text>
                                    <h5>Ingredientes</h5>
                                    <ListGroup className="list-group-flush">
                                        {pizza.ingredients.map((ingredient, index) => (
                                            <ListGroup.Item key={index}>
                                                <img src="../src/img/pizza.png" alt="" className="icontiny"/> {ingredient}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <div className='pizzadetailItems'>
                                        <Card.Text>
                                            <h3>Precio: ${formatNumber(pizza.price)}</h3>
                                        </Card.Text>
                                        <Button variant="danger" onClick={() => addToCart(pizza)}>Añadir <img src="../src/img/shopping-cart.png" alt="" className='icontiny'/></Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Pizzas;





