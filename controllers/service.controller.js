import Service from "../models/service.model.js";

export const getServices = async (req, res) => {
  const services = await Service.find();
  res.send(services);
};

export const createService = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }
  try {
    const service = await Service.create(req.body);
    res.send(service);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const seedServices = async (req, res) => {
  const servicesData = [
    {
      name: "บริการตัดขนแมว",
      description: "บริการตัดขน ตกแต่งทรงขนให้น้องแมวสวยงาม ลดปัญหาขนพันกันและก้อนขน",
      price: 500,
      image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=800&q=80",
      type: "grooming"
    },
    {
      name: "บริการอาบน้ำแมว",
      description: "อาบน้ำทำความสะอาดด้วยแชมพูสูตรอ่อนโยน เป่าขนแห้งสนิท สบายตัว",
      price: 300,
      image: "https://images.unsplash.com/photo-1516139008210-96e45dccd83b?auto=format&fit=crop&w=800&q=80",
      type: "grooming"
    },
    {
      name: "บริการฝากเลี้ยง (Cat Hotel)",
      description: "ห้องพักส่วนตัว สะอาด ปลอดภัย มีพี่เลี้ยงดูแลใส่ใจตลอด 24 ชั่วโมง",
      price: 400,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
      type: "hotel"
    },
    {
      name: "บริการตรวจสุขภาพเบื้องต้น",
      description: "ตรวจเช็คสุขภาพทั่วไป วัดไข้ ชั่งน้ำหนัก โดยผู้เชี่ยวชาญ",
      price: 200,
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
      type: "checkup"
    }
  ];

  try {
   
    await Service.deleteMany({});
    await Service.insertMany(servicesData);
    res.send({ message: "สร้างข้อมูลบริการเรียบร้อยแล้ว (Seeded)" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
    res.send(service);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


export const updateService = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
    res.send(service);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: "สำหรับ Admin เท่านั้น" });
  }
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).send({ message: "ไม่พบบริการ" });
    res.send({ message: "ลบบริการสำเร็จ" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
