const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const AdminListing = require("../models/AdminListing");
const Booking = require("../models/Booking");
const User = require("../models/User");
const { verifyToken, requireAdmin } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

// GET /admin - show all listings
router.get("/", verifyToken, requireAdmin, async (req, res) => {
  try {
    const pending = await Listing.find({ status: "pending" }).populate("owner");
    const approved = await Listing.find({ status: "approved" }).populate(
      "owner"
    );
    const declined = await Listing.find({ status: "declined" }).populate(
      "owner"
    );

    res.render("admin", { pending, approved, declined });
  } catch (error) {
    console.error("Error fetching admin listings:", error);
    res.status(500).send("Error fetching admin listings");
  }
});

// POST /admin/approve/:id
router.post("/approve/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!listing) return res.status(404).send("Listing not found");

    // Update AdminListing if exists
    await AdminListing.updateMany(
      { listing: mongoose.Types.ObjectId(req.params.id) },
      { status: "approved" }
    );

    console.log("Approved listing:", listing);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error approving listing:", error);
    res.status(500).send("Error approving listing");
  }
});

// POST /admin/decline/:id
router.post("/decline/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status: "declined" },
      { new: true }
    );
    if (!listing) return res.status(404).send("Listing not found");

    // Update AdminListing if exists
    await AdminListing.updateMany(
      { listing: mongoose.Types.ObjectId(req.params.id) },
      { status: "declined" }
    );

    console.log("Declined listing:", listing);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error declining listing:", error);
    res.status(500).send("Error declining listing");
  }
});

// POST /admin/delete/:id - NO AUTH REQUIRED
router.post("/delete/:id", async (req, res) => {
  try {
    const listingId = req.params.id;
    console.log("Attempting to delete listing with ID:", listingId);

    // Find listing first
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    console.log("Found listing to delete:", {
      id: listing._id,
      name: listing.name,
      owner: listing.owner,
      sellerName: listing.sellerName,
    });

    // Delete Listing
    const result = await Listing.findByIdAndDelete(listingId);

    // Delete associated AdminListing entries
    await AdminListing.deleteMany({
      listing: mongoose.Types.ObjectId(listingId),
    });
    console.log("Deleted associated AdminListing entries for:", listingId);

    // Delete associated Bookings to prevent farmer dashboard errors
    const deletedBookings = await Booking.deleteMany({ listing: listingId });
    console.log(
      `Deleted ${deletedBookings.deletedCount} bookings for listing:`,
      listingId
    );

    if (result) {
      return res.redirect("/admin");
    } else {
      return res.status(404).send("Listing not found");
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    return res.redirect("/admin");
  }
});

// GET /admin/edit/:id
router.get("/edit/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send("Listing not found");

    res.render("editListing", {
      listing,
      REGIONS: [
        "Thane",
        "Pune",
        "Nashik",
        "Aurangabad",
        "Nagpur",
        "Kolhapur",
        "Satara",
        "Solapur",
      ],
      CATEGORIES: [
        "Tractor",
        "Rotavator",
        "Seeder",
        "Harvester",
        "Sprayer",
        "Tiller",
        "Baler",
        "Axe",
      ],
    });
  } catch (error) {
    console.error("Error fetching listing for edit:", error);
    res.status(500).send("Error fetching listing");
  }
});

// POST /admin/edit/:id
router.post("/edit/:id", verifyToken, requireAdmin, async (req, res) => {
  try {
    const { name, category, region, pricePerDay, img } = req.body;
    const result = await Listing.findByIdAndUpdate(
      req.params.id,
      { name, category, region, pricePerDay, img },
      { new: true }
    );
    if (!result) return res.status(404).send("Listing not found");

    console.log("Updated listing:", result);
    res.redirect("/admin");
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).send("Error updating listing");
  }
});

// GET /admin/analytics - show equipment utilization analytics - NO AUTH REQUIRED
router.get("/analytics", async (req, res) => {
  try {
    // Get all listings
    const listings = await Listing.find({ status: "approved" });

    // Get all bookings
    const bookings = await Booking.find().populate("listing");

    // Calculate equipment utilization metrics
    const equipmentData = listings.map((listing) => {
      // Find all bookings for this listing
      const listingBookings = bookings.filter(
        (booking) =>
          booking.listing &&
          booking.listing._id.toString() === listing._id.toString()
      );

      // Calculate total booked days
      const totalBookedDays = listingBookings.reduce((sum, booking) => {
        const days = Math.ceil(
          (booking.to - booking.from) / (1000 * 60 * 60 * 24)
        );
        return sum + days;
      }, 0);

      // Calculate utilization rate (assuming 30 days/month for simplicity)
      const utilizationRate = Math.min(
        100,
        Math.round((totalBookedDays / 30) * 100)
      );

      return {
        id: listing._id,
        name: listing.name,
        category: listing.category,
        pricePerDay: listing.pricePerDay,
        totalBookedDays,
        utilizationRate,
        totalRevenue: listingBookings.reduce(
          (sum, booking) => sum + booking.amount,
          0
        ),
        bookingCount: listingBookings.length,
      };
    });

    // Sort by utilization rate (highest first)
    equipmentData.sort((a, b) => b.utilizationRate - a.utilizationRate);

    // Calculate overall statistics
    const totalEquipment = listings.length;
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + booking.amount,
      0
    );

    // Top performing equipment (by revenue)
    const topEquipment = [...equipmentData]
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);

    res.render("admin-analytics", {
      equipmentData,
      totalEquipment,
      totalBookings,
      totalRevenue,
      topEquipment,
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).send("Error fetching analytics data");
  }
});

module.exports = router;
