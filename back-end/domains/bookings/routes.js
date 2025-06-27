import { Router } from "express";
import Booking from "./model.js";
import { connectDb } from "../../config/db.js";
import { JWTVerify } from "../../utils/jwt.js";

const router = Router();

router.get("/owner", async (req, res) => {
  connectDb();

  try {
    const { _id: id } = await JWTVerify(req);

    try {
      const bookingDocs = await Booking.find({ user: id }).populate("place");

      res.json(bookingDocs);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json("Deu erro ao buscar todas as Reservas daquele usuário");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao validar o token do usuário");
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
    // Verify JWT
    const userInfo = await JWTVerify(req);

    // Validate ID format if needed (optional)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("ID inválido");
    }

    // Find and verify the booking
    const bookingDoc = await Booking.findById(id);

    if (!bookingDoc) {
      return res.status(404).json("Reserva não encontrada");
    }

    // Verify ownership
    if (bookingDoc.user.toString() !== userInfo._id) {
      return res.status(403).json("A reserva não pertence ao usuário");
    }

    // Delete the document
    await bookingDoc.deleteOne();

    // 204 is more appropriate for deletions
    return res.status(204).end();

  } catch (error) {
    console.error("Delete error:", error);

    // Handle specific errors
    if (error.name === 'CastError') {
      return res.status(400).json("ID inválido");
    }

    // Generic error response
    return res.status(500).json("Erro ao cancelar a reserva");
  }
});

export default router;
