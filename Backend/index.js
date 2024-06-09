const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001; // Asegúrate de que este puerto no esté en uso

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventarify'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Rutas para CategoriaProducto

// Obtener todas las categorías
app.get('/api/categories', (req, res) => {
  connection.query('SELECT * FROM categoriaproductos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear una nueva categoría
app.post('/api/categories', (req, res) => {
  const { nombre, descripcion } = req.body;
  connection.query('INSERT INTO categoriaproductos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, descripcion });
  });
});

// Actualizar una categoría
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  connection.query('UPDATE categoriaproductos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id], (err, results) => {
    if (err) throw err;
    res.json({ id, nombre, descripcion });
  });
});

// Eliminar una categoría
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM categoriaproductos WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Cliente

// Obtener todos los clientes
app.get('/api/cliente', (req, res) => {
  connection.query('SELECT * FROM cliente', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo cliente
app.post('/api/cliente', (req, res) => {
  const { nombre, apellido, direccion, email, telefono } = req.body;
  connection.query('INSERT INTO cliente (nombre, apellido, direccion, email, telefono) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, direccion, email, telefono], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, apellido, direccion, email, telefono });
  });
});

// Actualizar un cliente
app.put('/api/cliente/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, email, telefono } = req.body;
  connection.query('UPDATE cliente SET nombre = ?, apellido = ?, direccion = ?, email = ?, telefono = ? WHERE id = ?', [nombre, apellido, direccion, email, telefono, id], (err, results) => {
    if (err) throw err;
    res.json({ id, nombre, apellido, direccion, email, telefono });
  });
});

// Eliminar un cliente
app.delete('/api/cliente/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM cliente WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Departamentos

// Obtener todos los departamentos
app.get('/api/departamentos', (req, res) => {
  connection.query('SELECT * FROM departamentos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo departamento
app.post('/api/departamentos', (req, res) => {
  const { nombre, descripcion } = req.body;
  connection.query('INSERT INTO departamentos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, descripcion });
  });
});

// Actualizar un departamento
app.put('/api/departamentos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  connection.query('UPDATE departamentos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id], (err, results) => {
    if (err) throw err;
    res.json({ id, nombre, descripcion });
  });
});

// Eliminar un departamento
app.delete('/api/departamentos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM departamentos WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Factura

// Obtener todas las facturas
app.get('/api/facturas', (req, res) => {
  connection.query('SELECT * FROM factura', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear una nueva factura
app.post('/api/facturas', (req, res) => {
  const { Fecha, Cantidad_Producto, Cliente } = req.body;
  connection.query('INSERT INTO factura (Fecha, Cantidad_Producto, Cliente) VALUES (?, ?, ?)', [Fecha, Cantidad_Producto, Cliente], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, Fecha, Cantidad_Producto, Cliente });
  });
});

// Actualizar una factura
app.put('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  const { Fecha, Cantidad_Producto, Cliente } = req.body;
  connection.query('UPDATE factura SET Fecha = ?, Cantidad_Producto = ?, Cliente = ? WHERE id = ?', [Fecha, Cantidad_Producto, Cliente, id], (err, results) => {
    if (err) throw err;
    res.json({ id, Fecha, Cantidad_Producto, Cliente });
  });
});

// Eliminar una factura
app.delete('/api/facturas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM factura WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Productos

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, precio, proveedor, cantidad_inventario } = req.body;
  connection.query('INSERT INTO productos (nombre, descripcion, precio, proveedor, cantidad_inventario) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, proveedor, cantidad_inventario], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, descripcion, precio, proveedor, cantidad_inventario });
  });
});

// Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, proveedor, cantidad_inventario } = req.body;
  connection.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, proveedor = ?, cantidad_inventario = ? WHERE id = ?', [nombre, descripcion, precio, proveedor, cantidad_inventario, id], (err, results) => {
    if (err) throw err;
    res.json({ id, nombre, descripcion, precio, proveedor, cantidad_inventario });
  });
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Proveedores

// Obtener todos los proveedores
app.get('/api/proveedores', (req, res) => {
  connection.query('SELECT * FROM proveedores', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo proveedor
app.post('/api/proveedores', (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  connection.query('INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)', [nombre, direccion, telefono], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, nombre, direccion, telefono });
  });
});

// Actualizar un proveedor
app.put('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;
  connection.query('UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre, direccion, telefono, id], (err, results) => {
    if (err) throw err;
    res.json({ id, nombre, direccion, telefono });
  });
});

// Eliminar un proveedor
app.delete('/api/proveedores/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM proveedores WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Users

// Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const { fullname, username, password_hash, secretpin } = req.body;
  connection.query('INSERT INTO users (fullname, username, password_hash, secretpin) VALUES (?, ?, ?, ?)', [fullname, username, password_hash, secretpin], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, fullname, username, password_hash, secretpin });
  });
});

// Actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { fullname, username, password_hash, secretpin } = req.body;
  connection.query('UPDATE users SET fullname = ?, username = ?, password_hash = ?, secretpin = ? WHERE id = ?', [fullname, username, password_hash, secretpin, id], (err, results) => {
    if (err) throw err;
    res.json({ id, fullname, username, password_hash, secretpin });
  });
});

// Eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

// Rutas para Ventas

// Obtener todas las ventas
app.get('/api/ventas', (req, res) => {
  connection.query('SELECT * FROM ventas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Crear una nueva venta
app.post('/api/ventas', (req, res) => {
  const { fecha_venta, total_ventas } = req.body;
  connection.query('INSERT INTO ventas (fecha_venta, total_ventas) VALUES (?, ?)', [fecha_venta, total_ventas], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, fecha_venta, total_ventas });
  });
});

// Actualizar una venta
app.put('/api/ventas/:id', (req, res) => {
  const { id } = req.params;
  const { fecha_venta, total_ventas } = req.body;
  connection.query('UPDATE ventas SET fecha_venta = ?, total_ventas = ? WHERE id = ?', [fecha_venta, total_ventas, id], (err, results) => {
    if (err) throw err;
    res.json({ id, fecha_venta, total_ventas });
  });
});

// Eliminar una venta
app.delete('/api/ventas/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM ventas WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});