import { useState, useEffect } from "react";
import { fetchReviews, submitReview } from "../api/reviewsApi";

export default function Reviews({ hotelId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews(hotelId);
        setReviews(data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.comment) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    try {
      const newReview = { ...form, hotelId };
      await submitReview(newReview);
      setReviews([newReview, ...reviews]);
      setForm({ name: "", rating: 5, comment: "" });
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <section className="mt-12 py-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {/* Average Rating */}
        <div className="flex items-center mb-8">
          <div className="flex items-center mr-4">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-2xl ${i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{averageRating.toFixed(1)} out of 5</span>
          <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
        </div>

        {/* Submit Review Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Your Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        {/* Display Reviews */}
        {loading ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}