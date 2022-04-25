import Admin from "../models/Admin.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


// Register an admin

const register = async (req, res) => {

  // Avoid duplicated

  const { username, email } = req.body;
  const adminExists = await Admin.findOne({ username });
  const emailExists = await Admin.findOne({ email });
  if (adminExists || emailExists) {
    const error = new Error("El usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }

  // If the username doesn't exist, trycatch for register

  try {
    // Put the info into the object
    const admin = new Admin(req.body);

    // Save it into the DB
    await admin.save();

    // Return a message

    res.json({
      msg: "Administrador creado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

// Login an admin

const authenticate = async (req, res) => {

  const { username, password } = req.body;

  // Check if the admin exists

  const admin = await Admin.findOne({ username });

  if (!admin) {
    const error = new Error("El administrador no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Check the password

  if (await admin.checkPassword(password)) {
    res.json({
      _id: admin._id,
      nombre: admin.nombre,
      email: admin.email,
      token: generarJWT(admin._id),
    });
  } else {
    const error = new Error("Datos incorrectos");
    return res.status(403).json({
      msg: error.message,
    });
  }
};

// Check if the user is auth

const profile = async (req, res) => {

  const { admin } = req;
  res.json(admin);
};

export { register, authenticate, profile };
