import Cat from "../models/cat.model.js";

export const createCat = async (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).send({ message: "กรอกข้อมูลแมวให้ครบ" });
  }

  const imageUrl = req.file
    ? `/uploads/cats/${req.file.filename}`
    : null;

  const cat = await Cat.create({
    name,
    age,
    imageUrl,
    owner: req.user.id,
  });

  res.send(cat);
};
