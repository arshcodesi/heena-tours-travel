import { useEffect, useState } from 'react';
import axios from 'axios';

function HotelsSection() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/hotels')
      .then(res => {
        console.log('Hotels data:', res.data);
        setHotels(res.data.slice(0, 3));  // Show 3 featured
      })
      .catch(err => {
        console.error('Error fetching hotels:', err);
        setError('Failed to load hotels');
      });
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">Featured Hotels</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotels.map(hotel => (
          <div key={hotel._id} className="border p-4 rounded shadow">
            <h3 className="text-xl">{hotel.name}</h3>
            <iframe src={hotel.mapEmbed} width="300" height="200" className="border"></iframe>
            <p>Min Price: {hotel.minPrice} | Max Price: {hotel.maxPrice}</p>
            <p>Facilities: {hotel.facilities.join(', ')}</p>
            <button className="bg-green-500 text-white p-2 mt-2">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HotelsSection;