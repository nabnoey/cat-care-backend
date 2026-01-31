import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  const { catId, serviceId, bookingDate } = req.body;

  const booking = await Booking.create({
    customer: req.user.id,
    cat: catId,
    service: serviceId,
    bookingDate,
  });

  res.send(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user.id })
    .populate("cat")
    .populate("service");

  res.send(bookings);
};
