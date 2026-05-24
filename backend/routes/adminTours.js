const express = require("express");
const { z } = require("zod");
const Tour = require("../models/Tour");
const requireAdmin = require("../middlewares/requireAdmin");

const router = express.Router();

const priceSchema = z.object({
  label: z.string().min(1),
  amount: z.number().nonnegative(),
  unit: z.string().optional().default("")
});

const tourCreateSchema = z.object({
  name: z.string().min(1),
  durationText: z.string().min(1),
  transportText: z.string().optional().default(""),
  covers: z.array(z.string().min(1)).min(1),
  includes: z.array(z.string().min(1)).optional().default([]),
  prices: z.array(priceSchema).optional().default([]),
  notes: z.string().optional().default(""),
  mapQuery: z.string().optional().default(""),
  mapEmbed: z.string().optional().default(""),
  isActive: z.boolean().optional().default(true)
});

const tourUpdateSchema = tourCreateSchema.partial();

/**
 * ADMIN: list all tours (active + inactive)
 * GET /api/admin/tours?page=1&limit=20
 */
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Tour.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Tour.countDocuments()
    ]);

    return res.json({
      items,
      page,
      limit,
      total
    });
  } catch (err) {
    return next(err);
  }
});

/**
 * ADMIN: create tour
 * POST /api/admin/tours
 */
router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const parsed = tourCreateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    }

    const created = await Tour.create(parsed.data);
    return res.status(201).json(created);
  } catch (err) {
    // Handle duplicate name nicely
    if (err && err.code === 11000) {
      return res.status(409).json({ error: "Tour name already exists" });
    }
    return next(err);
  }
});

/**
 * ADMIN: update tour
 * PUT /api/admin/tours/:id
 */
router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const parsed = tourUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    }

    const updated = await Tour.findByIdAndUpdate(
      req.params.id,
      { $set: parsed.data },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Tour not found" });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

/**
 * ADMIN: toggle active/inactive
 * PATCH /api/admin/tours/:id/toggle
 */
router.patch("/:id/toggle", requireAdmin, async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    tour.isActive = !tour.isActive;
    await tour.save();

    return res.json({ id: tour._id, isActive: tour.isActive });
  } catch (err) {
    return next(err);
  }
});

/**
 * ADMIN: delete tour
 * DELETE /api/admin/tours/:id
 */
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Tour not found" });

    return res.json({ ok: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;