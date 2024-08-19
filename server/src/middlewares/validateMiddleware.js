// validateMiddleware.js
export const validparameters = (req, res, next) => {
  const { email, contraseña } = req.body;
  if (!email || !contraseña) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }
  next();
};

export const validateParametersUser = (req, res, next) => {
  const { nombre, apellido, email, contraseña, avatar } = req.body;
  console.log('Datos recibidos en el middleware:', { nombre, apellido, email, contraseña, avatar });
  if (req.method === 'POST') {
    if (!nombre || !apellido || !email || !contraseña || !avatar) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
  }
  // Para la actualización.
  if (req.method === 'PUT') {
    if (!nombre || !apellido || !email || !avatar) {
      return res.status(400).json({ error: 'Nombre, Apellido, Email y Avatar son requeridos' });
    }
  }
  next();
};

export const validatePublicationData = (req, res, next) => {
  const { url_imagen_juego, titulo, descripcion, precio, stock, estado, id_categoria } = req.body;
  
  if (!titulo || !descripcion || !precio || !stock || !estado || !id_categoria) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  
  if (estado !== 'disponible' && estado !== 'vendido') {
    return res.status(400).json({ error: 'El estado debe ser "disponible" o "vendido"' });
  }
  
  next();
};

export const validateFavoriteData = (req, res, next) => {
  const { id_usuario, id_publicacion, valoracion } = req.body;

  if (!id_usuario || !id_publicacion || typeof valoracion !== 'boolean') {
    return res.status(400).json({ error: 'Todos los campos son requeridos y la valoración debe ser un valor booleano' });
  }

  next();
};

export const validateCategoryData = (req, res, next) => {
  const { nombre } = req.body;
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).json({ error: 'Nombre de la categoría es requerido y debe ser una cadena no vacía' });
  }
  next();
};

export const validateCartItemData = (req, res, next) => {
  const { id_publicacion, monto, estado } = req.body;

  if (!id_publicacion || !monto || !estado) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  if (estado !== 'pendiente' && estado !== 'completado' && estado !== 'cancelado') {
    return res.status(400).json({ error: 'El estado debe ser "pendiente", "completado" o "cancelado"' });
  }

  next();
};