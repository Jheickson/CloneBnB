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
  connectDb();

  const { id } = req.params;

  try {
    const userInfo = await JWTVerify(req);

    const bookingDoc = await Booking.findById(id);

    if (!bookingDoc) return res.status(404).json("Reserva não encontrada");

    if (bookingDoc.user.toString() !== userInfo._id)
      return res.status(403).json("A reserva não pertence ao usuário");

    await bookingDoc.deleteOne();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Deu erro ao cancelar a Reserva");
  }
});


export default router;
