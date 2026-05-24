import { useEffect, useState } from 'react';
import axios from 'axios';

function ToursSection() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios.get('/api/tours').then(res => setTours(res.data));
  }, []);

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold">Tour & Travel Packages</h2>
      {tours.map(tour => (
        <div key={tour._id} className="border p-4 mt-4">
          <h3>{tour.name}</h3>
          <iframe src={tour.mapEmbed} width="300" height="200"></iframe>
          <p>Distance: {tour.distance}</p>
          <table className="table-auto">
            <thead><tr><th>Vehicle</th><th>Price</th></tr></thead>
            <tbody>
              <tr><td>Bike</td><td>{tour.pricing.bike}</td></tr>
              <tr><td>Car</td><td>{tour.pricing.car}</td></tr>
              <tr><td>Bus</td><td>{tour.pricing.bus}</td></tr>
            </tbody>
          </table>
          <form className="mt-4">
            <input type="text" placeholder="Name" className="border p-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 ml-2">Book</button>
          </form>
        </div>
      ))}
    </section>
  );
}

export default ToursSection;