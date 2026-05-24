import { useState } from "react";
import { useHotels } from "../hooks/useHotels";
import { addHotel, updateHotel, deleteHotel } from "../api/hotelsApi";

export default function AdminHotelsPage() {
  const { hotels, refetch, loading } = useHotels();
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    imageUrl: "",
    starRating: 3,
    pricePerNight: "",
    amenities: "",
    roomTypes: [{ type: "", price: "" }], // Array for room types
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get admin token (assume it's stored in localStorage; adjust if needed)
  const token = ("adminToken"); // Replace with your token logic

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRoomTypeChange = (index, field, value) => {
    const updatedRoomTypes = [...form.roomTypes];
    updatedRoomTypes[index][field] = value;
    setForm({ ...form, roomTypes: updatedRoomTypes });
  };

  const addRoomType = () => {
    setForm({ ...form, roomTypes: [...form.roomTypes, { type: "", price: "" }] });
  };

  const removeRoomType = (index) => {
    const updatedRoomTypes = form.roomTypes.filter((_, i) => i !== index);
    setForm({ ...form, roomTypes: updatedRoomTypes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.name || !form.location || !form.description || !form.pricePerNight) {
      setError("Please fill in all required fields.");
      return;
    }

    const hotelData = {
      ...form,
      pricePerNight: Number(form.pricePerNight),
      starRating: Number(form.starRating),
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      roomTypes: form.roomTypes.filter((r) => r.type && r.price).map((r) => ({
        type: r.type,
        price: Number(r.price),
      })),
    };

    try {
      if (editingId) {
        await updateHotel(editingId, hotelData, token);
        setSuccess("Hotel updated successfully!");
      } else {
        await addHotel(hotelData, token);
        setSuccess("Hotel added successfully!");
      }
      refetch();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    }
  };

  const handleEdit = (hotel) => {
    setForm({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      imageUrl: hotel.imageUrl,
      starRating: hotel.starRating,
      pricePerNight: hotel.pricePerNight,
      amenities: hotel.amenities.join(", "),
      roomTypes: hotel.roomTypes.length > 0 ? hotel.roomTypes : [{ type: "", price: "" }],
    });
    setEditingId(hotel._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await deleteHotel(id, token);
      setSuccess("Hotel deleted successfully!");
      refetch();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete hotel.");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      location: "",
      description: "",
      imageUrl: "",
      starRating: 3,
      pricePerNight: "",
      amenities: "",
      roomTypes: [{ type: "", price: "" }],
    });
    setEditingId(null);
  };

  if (loading) return <div className="text-center py-10">Loading hotels...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Hotels</h1>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{success}</div>}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Hotel" : "Add New Hotel"}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder="Hotel Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleFormChange}
            placeholder="Location"
            className="p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Description"
            className="p-2 border rounded md:col-span-2"
            required
          />
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleFormChange}
            placeholder="Image URL"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="starRating"
            value={form.starRating}
            onChange={handleFormChange}
            min="1"
            max="5"
            placeholder="Star Rating"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="pricePerNight"
            value={form.pricePerNight}
            onChange={handleFormChange}
            placeholder="Price per Night"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="amenities"
            value={form.amenities}
            onChange={handleFormChange}
            placeholder="Amenities (comma-separated)"
            className="p-2 border rounded md:col-span-2"
          />
        </div>

        {/* Room Types */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Room Types</h3>
          {form.roomTypes.map((room, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={room.type}
                onChange={(e) => handleRoomTypeChange(index, "type", e.target.value)}
                placeholder="Room Type"
                className="p-2 border rounded flex-1"
              />
              <input
                type="number"
                value={room.price}
                onChange={(e) => handleRoomTypeChange(index, "price", e.target.value)}
                placeholder="Price"
                className="p-2 border rounded w-24"
              />
              <button
                type="button"
                onClick={() => removeRoomType(index)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRoomType}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Room Type
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {editingId ? "Update Hotel" : "Add Hotel"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Hotels List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold">{hotel.name}</h3>
            <p className="text-sm text-gray-600">{hotel.location}</p>
            <p className="text-sm">₹{hotel.pricePerNight.toLocaleString()} per night</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(hotel)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(hotel._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}