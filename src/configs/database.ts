import dotenv from "dotenv"
import { Sequelize } from "sequelize-typescript"
import { Book } from "../models/book.js"
import { BookReadingList } from "../models/bookReadingList.js"
import { ReadingList } from "../models/readingList.js"
import { User } from "../models/user.js"

const result = dotenv.config()

if (!process.env.DB_URL) {
  throw new Error("La variable d'environnement DB_CONNECTION_URL n'est pas définie !")
}

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  models: [Book, ReadingList, BookReadingList, User], // Ajout automatique des modèles
  logging: false,
})

export const initDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection à la base de données établie.")
    await sequelize.sync({ alter: true }) // En développement uniquement
    console.log("Modèles synchronisés avec la base de données.")
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error)
    process.exit(1)
  }
}

export default sequelize
