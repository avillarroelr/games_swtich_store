import React from 'react';
import GameForm from '../components/GameForm';
import Swal from 'sweetalert2';

const AddGame = () => {
    const addGameToJson = (newGame) => {
        fetch('/juegos.json')
            .then(response => response.json())
            .then(data => {
                // Autoincrementar el id_juego
                const newId = data.length > 0 ? (parseInt(data[data.length - 1].id_juego) + 1).toString() : "1";
                const gameWithId = { ...newGame, id_juego: newId };
                
                const updatedGames = [...data, gameWithId];
                return fetch('/juegos.json', {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedGames)
                });
            })
            .then(response => {
                if (response.ok) {
                    //alert('Juego agregado exitosamente!');
                    Swal.fire({
                        icon: 'success',
                        title: '¡Juego agregado exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    //alert('Hubo un problema al agregar el juego.');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hubo un problema al agregar el juego.',
                        showConfirmButton: true,
                        confirmButtonText: 'Aceptar'
                    });
                }
            })
            .catch(error => console.error('Error al actualizar el archivo JSON:', error));
    };

    return (
        <div>
            <GameForm onAddGame={addGameToJson} />
        </div>
    );
};

export default AddGame;