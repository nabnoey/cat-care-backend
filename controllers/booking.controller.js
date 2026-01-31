import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  // 1. 🛡️ ป้องกัน Admin จองคิว (Admin มีหน้าที่จัดการ ไม่ใช่จองเอง)
  if (req.user.role === 'admin') {
    return res.status(403).send({ message: "Admin ไม่สามารถทำรายการจองได้" });
  }

  const { catId, serviceId, bookingDate } = req.body;
  const MAX_BOOKINGS_PER_DAY = 10; // 🔢 กำหนดจำนวนคิวสูงสุดต่อวัน (ปรับค่าได้ตามจริง)

  // 2. 📅 เช็คว่าวันนั้นคิวเต็มหรือยัง
  const date = new Date(bookingDate);
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const bookingCount = await Booking.countDocuments({
    bookingDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: "cancelled" } // ไม่นับคิวที่ยกเลิกไปแล้ว
  });

  if (bookingCount >= MAX_BOOKINGS_PER_DAY) {
    return res.status(400).send({ message: `ขออภัย คิววันที่ ${date.toLocaleDateString()} เต็มแล้ว (${MAX_BOOKINGS_PER_DAY}/${MAX_BOOKINGS_PER_DAY})` });
  }

  const booking = await Booking.create({
    owner: req.user.id,
    cat: catId,
    service: serviceId,
    bookingDate,
  });

  res.send(booking);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ owner: req.user.id })
    .populate("cat")
    .populate("service")
    .sort({ bookingDate: -1 }); // เรียงจากวันที่ล่าสุดไปเก่าสุด 

  res.send(bookings);
};

export const getAllBookings = async (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};

  const bookings = await Booking.find(query)
    .populate("cat")
    .populate("service")
    .populate("owner", "username email")
    .sort({ bookingDate: -1 }); // ✅ เรียงลำดับเพื่อดูประวัติล่าสุด
  res.send(bookings);
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, owner: req.user.id })
      .populate("cat")
      .populate("service");
    if (!booking) return res.status(404).send({ message: "ไม่พบข้อมูลการจอง" });
    res.send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const user = req.user;
    let query = { _id: req.params.id };
    let updateData = { ...req.body };

    // 🛡️ แยก Logic ตาม Role
    if (user.role !== 'admin') {
      
      query.owner = user.id;
      delete updateData.status; 
      delete updateData.adminMessage;
    }
    

    const booking = await Booking.findOneAndUpdate(
      query,
      updateData,
      { new: true }
    );
    if (!booking) return res.status(404).send({ message: "ไม่พบข้อมูลการจอง" });
    res.send(booking);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const user = req.user;
    let query = { _id: req.params.id };

    if (user.role !== 'admin') {
      query.owner = user.id;
    }

 
    const booking = await Booking.findOneAndUpdate(
      query,
      { status: "cancelled" }, // เปลี่ยนสถานะเป็นยกเลิก
      { new: true }
    );
    if (!booking) return res.status(404).send({ message: "ไม่พบข้อมูลการจอง" });
    res.send({ message: "ยกเลิกการจองสำเร็จ" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const getAdminNotifications = async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "pending" })
      .populate("cat")
      .populate("service")
      .populate("owner", "username email")
      .sort({ createdAt: -1 }); // เรียงจากใหม่ไปเก่า

    res.send(pendingBookings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
