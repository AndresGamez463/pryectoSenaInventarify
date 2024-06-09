import React from 'react';
import CategoryList from './components/CategoryList';
import ListaCliente from './components/ListaCliente';
import ListaDepartamento from './components/ListaDepartamento';
import ListaFactura from './components/ListaFactura';
import ListaProducto from './components/ListaProducto';
import ListaProveedor from './components/ListaProveedor';
import ListaUser from './components/ListaUser';
import ListaVenta from './components/ListaVenta';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventarify</h1>
      </header>
      <main>
        <CategoryList />
        <ListaCliente />
        <ListaDepartamento />
        <ListaFactura />
        <ListaProducto />
        <ListaProveedor />
        <ListaUser />
        <ListaVenta />
      </main>
    </div>
  );
};

export default App;
