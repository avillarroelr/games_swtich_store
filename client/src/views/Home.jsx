import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

const Home = ({ user, onAddToWishlist }) => {
    const [juegos, setJuegos] = useState([]);
    const [filteredJuegos, setFilteredJuegos] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const { addToCart, formatNumber } = useCart();
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/juegos.json')
            .then(response => response.json())
            .then(data => {
                setJuegos(data);
                setFilteredJuegos(data);
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    const handleCategoryChange = (category) => {
        const currentIndex = selectedCategories.indexOf(category);
        const newSelectedCategories = [...selectedCategories];

        if (currentIndex === -1) {
            newSelectedCategories.push(category);
        } else {
            newSelectedCategories.splice(currentIndex, 1);
        }

        setSelectedCategories(newSelectedCategories);
        filterGames(newSelectedCategories, selectedPriceRange);
    };

    const handlePriceChange = (priceRange) => {
        const newPriceRange = selectedPriceRange === priceRange ? '' : priceRange;
        setSelectedPriceRange(newPriceRange);
        filterGames(selectedCategories, newPriceRange);
    };

    const filterGames = (categories, priceRange) => {
        let filtered = juegos;

        if (categories.length > 0) {
            filtered = filtered.filter(juego =>
                juego.categoría.some(cat => categories.includes(cat))
            );
        }

        if (priceRange) {
            filtered = filtered.filter(juego => {
                const price = parseInt(juego.precio, 10);
                switch (priceRange) {
                    case 'free':
                        return price === 0;
                    case 'low':
                        return price > 0 && price <= 9999;
                    case 'mid':
                        return price >= 10000 && price <= 29999;
                    case 'high':
                        return price >= 30000 && price <= 49999;
                    case 'premium':
                        return price >= 50000;
                    default:
                        return true;
                }
            });
        }

        // Si no hay filtros muestra todos los juegos
        if (categories.length === 0 && !priceRange) {
            filtered = juegos;
        }

        setFilteredJuegos(filtered);
    };

    return (
        <div style={{ marginTop: '80px' }}>
            <Container className="mx-auto">
                <Row>
                    {/* Filtro Barra Izquierda */}
                    <Col sm={3} style={{ border: '1px solid black', padding: '10px' }}>
                        <h4>Filtros</h4>
                        <hr />
                        <h5>Género del Juego</h5>
                        <Form>
                            {['Acción', 'Aventuras', 'Deporte', 'Estrategia', 'Lucha'].map((category, index) => (
                                <Form.Check 
                                    type="checkbox" 
                                    key={index} 
                                    label={category} 
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}
                                />
                            ))}
                        </Form>
                        <hr />
                        <h5>Precios del Juego</h5>
                        <Form>
                            <Form.Check 
                                type="radio" 
                                label="Gratuito" 
                                name="priceRange" 
                                checked={selectedPriceRange === 'free'}
                                onChange={() => handlePriceChange('free')} 
                            />
                            <Form.Check 
                                type="radio" 
                                label="$1 - $9.999" 
                                name="priceRange" 
                                checked={selectedPriceRange === 'low'}
                                onChange={() => handlePriceChange('low')} 
                            />
                            <Form.Check 
                                type="radio" 
                                label="$10.000 - $29.999" 
                                name="priceRange" 
                                checked={selectedPriceRange === 'mid'}
                                onChange={() => handlePriceChange('mid')} 
                            />
                            <Form.Check 
                                type="radio" 
                                label="$30.000 - $49.999" 
                                name="priceRange" 
                                checked={selectedPriceRange === 'high'}
                                onChange={() => handlePriceChange('high')} 
                            />
                            <Form.Check 
                                type="radio" 
                                label="$50.000+" 
                                name="priceRange" 
                                checked={selectedPriceRange === 'premium'}
                                onChange={() => handlePriceChange('premium')} 
                            />
                            <Form.Check 
                                type="radio" 
                                label="Ver Todos" 
                                name="priceRange" 
                                checked={selectedPriceRange === ''}
                                onChange={() => handlePriceChange('')}
                            />
                        </Form>
                    </Col>

                    {/* Tarjetas de Juegos */}
                    <Col sm={9}>
                        <Row className="justify-content-center fx-auto">
                            {filteredJuegos.map((juego) => (
                                <Col xs={12} sm={12} md={5} lg={4} key={juego.id_juego} className="mb-4 col-auto">
                                    <Card style={{ width: '18rem' }} className="w-100">
                                        <Card.Img variant="top" src={juego.url_imagen_juego} alt={juego.titulo} />
                                        <Card.Body>
                                            <Card.Title>{juego.titulo}</Card.Title>
                                            <Card.Text style={{ textAlign: "justify" }}>
                                                {juego.descripción}
                                            </Card.Text>
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
                                            <div className="baseHome text-center">
                                                <Button variant="info" style={{ height: '2.5rem' }} onClick={() => navigate(`/detallejuego/${juego.id_juego}`)}>Ver Más  <img src="./src/img/eyes.png" alt="" className="icontiny" /></Button>
                                                <Button className="ms-2" style={{ height: '2.5rem' }} variant="danger" onClick={() => addToCart(juego)}>Añadir <img src="./src/img/shopping-cart.png" alt="" className="icontiny" /></Button>
                                                {user && (
                                                    <Button
                                                        className="ms-2 mt-2"
                                                        variant="outline-danger"
                                                        onClick={() => {
                                                            onAddToWishlist(juego);
                                                            //alert('Agregado a lista de deseos');
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Añadido a la lista de deseos',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            });
                                                        }}
                                                    >
                                                        ❤️
                                                    </Button>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;





