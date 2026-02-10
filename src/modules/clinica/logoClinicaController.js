const supabase = require("../../config/supabase");
const db = require("../../config/db");

const subirLogoClinica = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Logo requerido" });
    }

    const ext = file.originalname.split(".").pop();
    const filePath = `logos/clinica_${id}.${ext}`;

    const { error } = await supabase.storage
      .from("archivos") 
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("archivos")
      .getPublicUrl(filePath);

    const logoUrl = data.publicUrl;

    await db.query(
      "UPDATE clinicas SET logo_url = ? WHERE id_clinica = ?",
      [logoUrl, id]
    );

    res.json({
      message: "Logo actualizado correctamente",
      logo_url: logoUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir logo" });
  }
};

module.exports = {
  subirLogoClinica,
};
