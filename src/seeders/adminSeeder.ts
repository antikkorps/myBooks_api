import { User } from "../models/user.js"

export const seedAdmin = async () => {
  try {
    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({
      where: { email: "admin@example.com" },
    })

    if (!existingAdmin) {
      await User.create({
        username: "admin",
        email: "admin@example.com",
        password: process.env.ADMIN_PASSWORD,
      })
      console.log("✅ Utilisateur admin créé avec succès")
    } else {
      console.log("ℹ️ L'utilisateur admin existe déjà")
    }
  } catch (error) {
    console.error("❌ Erreur lors de la création de l'admin:", error)
  }
}
