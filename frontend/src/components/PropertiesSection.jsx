import { useEffect, useState } from 'react';
import axios from 'axios';

function PropertiesSection() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/properties')
      .then(res => {
        console.log('Properties data:', res.data);
        setProperties(res.data);
      })
      .catch(err => {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties');
      });
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Properties</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map(property => (
          <div key={property._id} className="border p-4 rounded shadow">
            <h3 className="text-xl">{property.name}</h3>
            <iframe src={property.mapEmbed} width="300" height="200" className="border"></iframe>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            <button className="bg-blue-500 text-white p-2 mt-2">Inquire</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PropertiesSection;