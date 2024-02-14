import axios from "axios";
const insertOrder = async (userId, products, authToken, totalAmount, discount) => {
    try {
      console.log('User ID:', userId);
      console.log('Products:', products);
  
      const orderData = {
        user_id: userId,
        total: totalAmount - discount ,
        products: products.map((product) => ({
          nom: product.nom,
          prix: product.prix,
          categorie_nom : product.categorie_nom ,

          quantite: product.cartQuantity,
        })),
      };
  
      console.log('Data:', orderData);
      
  
      const response = await axios.post('http://localhost:8000/api/commandes', orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response) {
        throw new Error('Failed to insert order');
      }
  
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error inserting order:', error);
      throw error;
    }
  };
  
  export default insertOrder;
  