import { Router } from "express";
import Booking from "./model.js";
import { connectDb } from "../../config/db.js";

const router = Router();

// JWT verification removed: return all bookings
router.get("/owner", async (req, res) => {
  connectDb();

  try {
    const bookingDocs = await Booking.find().populate("place");

    res.json(bookingDocs);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao buscar todas as Reservas");
  }
});

router.post("/", async (req, res) => {
  connectDb();

  const { place, user, price, total, checkin, checkout, guests, nights } =
    req.body;

  try {
    const newBookingDoc = await Booking.create({
      place,
      user,
      price,
      total,
      checkin,
      checkout,
      guests,
      nights,
    });

    res.json(newBookingDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro criar a Reserva");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Booking.findByIdAndDelete(id);

    return res.status(204).end();
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json("Erro ao cancelar a reserva");
  }
});

export default router;
