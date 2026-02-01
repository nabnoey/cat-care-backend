import Service from "../models/service.model.js";

// GET ALL
export const getServices = async (req, res) => {
  const services = await Service.find();
  res.send(services);
};

// CREATE
export const createService = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }

  try {
    const { name, price, description, type } = req.body;

    const service = await Service.create({
      name,
      price,
      description,
      type,
      image: req.file?.supabaseUrl || null, // ⭐
    });

    res.status(201).send(service);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// GET BY ID
export const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
  res.send(service);
};

// UPDATE
export const updateService = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }

  try {
    const updateData = { ...req.body };

    if (req.file?.supabaseUrl) {
      updateData.image = req.file.supabaseUrl; // ⭐
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
    res.send(service);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// DELETE
export const deleteService = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }

  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
  res.send({ message: "ลบบริการสำเร็จ" });
};

// SEED
export const seedServices = async (req, res) => {
  const servicesData = [
    {
      name: "บริการตัดขนแมว",
      description: "ตัดขนและตกแต่งทรง",
      price: 500,
      type: "grooming",
      image:
        "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "บริการอาบน้ำแมว",
      description: "อาบน้ำสูตรอ่อนโยน",
      price: 300,
      type: "grooming",
      image:
        "https://images.unsplash.com/photo-1516139008210-96e45dccd83b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  await Service.deleteMany({});
  await Service.insertMany(servicesData);
  res.send({ message: "Seed สำเร็จ" });
};
