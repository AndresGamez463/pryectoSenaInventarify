import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/ServicioProducto';

const ListaProducto = () => {
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({ nombre: '', descripcion: '', precio: '', proveedor: '', cantidad_inventario: '' });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProducto({ ...newProducto, [name]: value });
  };

  const handleCreate = async () => {
    await createProducto(newProducto);
    loadProductos();
    setNewProducto({ nombre: '', descripcion: '', precio: '', proveedor: '', cantidad_inventario: '' });
  };

  const handleUpdate = async (id) => {
    const producto = productos.find(prod => prod.id === id);
    await updateProducto(id, producto);
    loadProductos();
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    loadProductos();
  };

  const handleProductoChange = (id, field, value) => {
    const updatedProductos = productos.map(prod => 
      prod.id === id ? { ...prod, [field]: value } : prod
    );
    setProductos(updatedProductos);
  };

  return (
    <div>
      <h2>Productos</h2>
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newProducto.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={newProducto.descripcion}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          value={newProducto.precio}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="proveedor"
          placeholder="Proveedor"
          value={newProducto.proveedor}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="cantidad_inventario"
          placeholder="Cantidad Inventario"
          value={newProducto.cantidad_inventario}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Add Producto</button>
      </div>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <input
              type="text"
              value={producto.nombre}
              onChange={(e) => handleProductoChange(producto.id, 'nombre', e.target.value)}
            />
            <input
              type="text"
              value={producto.descripcion}
              onChange={(e) => handleProductoChange(producto.id, 'descripcion', e.target.value)}
            />
            <input
              type="text"
              value={producto.precio}
              onChange={(e) => handleProductoChange(producto.id, 'precio', e.target.value)}
            />
            <input
              type="text"
              value={producto.proveedor}
              onChange={(e) => handleProductoChange(producto.id, 'proveedor', e.target.value)}
            />
            <input
              type="number"
              value={producto.cantidad_inventario}
              onChange={(e) => handleProductoChange(producto.id, 'cantidad_inventario', e.target.value)}
            />
            <button onClick={() => handleUpdate(producto.id)}>Update</button>
            <button onClick={() => handleDelete(producto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProducto;
