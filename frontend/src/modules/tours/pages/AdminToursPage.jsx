import { useEffect, useMemo, useState } from "react";
import {
  createTour,
  deleteTour,
  fetchAdminTours,
  toggleTourActive,
  updateTour
} from "../api/toursApi.js";
import AdminTourForm from "../components/AdminTourForm.jsx";

function EmptyState({ onCreate }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8">
      <p className="text-sm font-extrabold text-slate-900">No tours yet</p>
      <p className="mt-1 text-sm text-slate-600">
        Create your first tour to show on /tours.
      </p>
      <button
        onClick={onCreate}
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-slate-800"
      >
        Add Tour
      </button>
    </div>
  );
}

export default function AdminToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mode, setMode] = useState("list"); // list | create | edit
  const [selected, setSelected] = useState(null);

  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAdminTours();
      setTours(data.tours || []);
    } catch (e) {
      setError(e.message || "Failed to load admin tours");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const sortedTours = useMemo(() => {
    return [...tours].sort((a, b) => {
      const an = (a?.name || "").toLowerCase();
      const bn = (b?.name || "").toLowerCase();
      return an.localeCompare(bn);
    });
  }, [tours]);

  async function handleCreate(payload) {
    setSaving(true);
    setActionError("");
    try {
      await createTour(payload);
      await load();
      setMode("list");
      setSelected(null);
    } catch (e) {
      setActionError(e.message || "Failed to create tour");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(payload) {
    if (!selected?._id) return;
    setSaving(true);
    setActionError("");
    try {
      await updateTour(selected._id, payload);
      await load();
      setMode("list");
      setSelected(null);
    } catch (e) {
      setActionError(e.message || "Failed to update tour");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Delete this tour? This cannot be undone.");
    if (!ok) return;

    setActionError("");
    try {
      await deleteTour(id);
      await load();
    } catch (e) {
      setActionError(e.message || "Failed to delete tour");
    }
  }

  async function handleToggleActive(tour) {
    setActionError("");
    try {
      await toggleTourActive(tour._id, !tour.active);
      await load();
    } catch (e) {
      setActionError(e.message || "Failed to toggle active status");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Tours</h1>
          <p className="mt-1 text-sm text-slate-600">
            Add, edit, delete tours. Control pricing and active status.
          </p>
        </div>

        {mode === "list" ? (
          <button
            onClick={() => {
              setMode("create");
              setSelected(null);
              setActionError("");
            }}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-slate-800"
          >
            + Add Tour
          </button>
        ) : (
          <button
            onClick={() => {
              setMode("list");
              setSelected(null);
              setActionError("");
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-50"
          >
            Back to List
          </button>
        )}
      </div>

      {actionError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {actionError}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-extrabold text-slate-900">Loading…</p>
          <p className="mt-1 text-sm text-slate-600">Fetching tours from server.</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-extrabold text-red-900">Error</p>
          <p className="mt-1 text-sm text-red-800">{error}</p>
          <button
            onClick={load}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-slate-800"
          >
            Retry
          </button>
        </div>
      ) : mode === "create" ? (
        <AdminTourForm
          title="Create Tour"
          initialValue={null}
          saving={saving}
          onSubmit={handleCreate}
        />
      ) : mode === "edit" ? (
        <AdminTourForm
          title="Edit Tour"
          initialValue={selected}
          saving={saving}
          onSubmit={handleUpdate}
        />
      ) : sortedTours.length === 0 ? (
        <EmptyState onCreate={() => setMode("create")} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-sm font-extrabold text-slate-900">Tours</p>
            <p className="text-xs text-slate-600">
              Active tours appear on the public /tours page.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {sortedTours.map((tour) => (
              <div key={tour._id} className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-base font-extrabold text-slate-900">
                      {tour.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{tour.duration}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                          tour.active
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {tour.active ? "Active" : "Inactive"}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Covers: {(tour.covers || []).length}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Pricing rows: {(tour.pricing || []).length}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleToggleActive(tour)}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-50"
                    >
                      {tour.active ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => {
                        setSelected(tour);
                        setMode("edit");
                        setActionError("");
                      }}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-slate-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(tour._id)}
                      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* quick preview */}
                {tour.covers?.length ? (
                  <p className="mt-3 text-sm text-slate-700">
                    <span className="font-semibold">Covers:</span>{" "}
                    {tour.covers.slice(0, 8).join(", ")}
                    {tour.covers.length > 8 ? "…" : ""}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}