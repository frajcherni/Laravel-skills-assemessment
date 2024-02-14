// PanierPage.jsx
import React from 'react';
import Panier from './panier';

const PanierPage = ({ cart }) => {
  return (
    <div>
      <h1>Panier Page</h1>
      <Panier cart={cart} />
    </div>
  );
};

export default PanierPage;
