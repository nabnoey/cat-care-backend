import Cat from "../models/cat.model.js";

export const createCat = async (req, res) => {
  const { name, ageYears, ageMonths } = req.body;

  if (!name) {
    return res.status(400).send({ message: "กรุณาระบุชื่อแมว" });
  }

  const imageUrl = req.file
    ? req.file.supabaseUrl
    : null;

  const cat = await Cat.create({
    name,
    ageYears: ageYears || 0,
    ageMonths: ageMonths || 0,
    imageUrl,
    owner: req.user.id,
  });

  res.send(cat);
};

export const getCats = async (req, res) => {
  const cats = await Cat.find({ owner: req.user.id });
  res.send(cats);
};

// ✅ Get Single Cat
export const getCatById = async (req, res) => {
  try {
    const cat = await Cat.findOne({ _id: req.params.id, owner: req.user.id });
    if (!cat) return res.status(404).send({ message: "ไม่พบแมว" });
    res.send(cat);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ✅ Update Cat
export const updateCat = async (req, res) => {
  try {
    const { name, ageYears, ageMonths } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (ageYears !== undefined) updateData.ageYears = ageYears || 0;
    if (ageMonths !== undefined) updateData.ageMonths = ageMonths || 0;
    
    if (req.file) {
      updateData.imageUrl = req.file.supabaseUrl;
    }

    const cat = await Cat.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updateData,
      { new: true }
    );
    if (!cat) return res.status(404).send({ message: "ไม่พบแมว" });
    res.send(cat);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// ✅ Delete Cat
export const deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!cat) return res.status(404).send({ message: "ไม่พบแมว" });
    res.send({ message: "ลบข้อมูลแมวสำเร็จ" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
