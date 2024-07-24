const Medicine = require("../models/medicine");
const multer = require("multer");
const path = require("path");
const NodeCache = require("node-cache");

// Initialize cache with a TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer file filter for image uploads only
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).single("imageUrl");

// Get all medicines with optional filters and sorting
const getAllMedicines = async (req, res) => {
  try {
    const {
      search,
      priceRange,
      quantityRange,
      manufacturer,
      sortByName,
      sortByPrice,
      sortByQuantity,
    } = req.query;

    // Build query object
    const query = {};
    if (search) {
      query.name = new RegExp(search, "i");
    }
    if (manufacturer) {
      query.manufacturer = manufacturer;
    }

    // Build sort options
    const sortOptions = {};
    if (sortByName) {
      sortOptions["name"] = sortByName === "name:desc" ? -1 : 1;
    }
    if (sortByPrice) {
      sortOptions["price"] = sortByPrice === "price:desc" ? -1 : 1;
    }
    if (sortByQuantity) {
      sortOptions["quantity"] = sortByQuantity === "quantity:desc" ? -1 : 1;
    }

    console.log("Sort Options:", sortOptions);

    // Fetch medicines from the database
    const medicines = await Medicine.find(query).sort(sortOptions).exec();

    // Cache the result
    cache.set("medicines", medicines);

    // Render the medicines page with fetched data
    res.render("medicines/index", {
      medicines,
      search,
      priceRange,
      quantityRange,
      manufacturer,
      sortByName,
      sortByPrice,
      sortByQuantity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Render form to create new medicine
const showCreateMedicineForm = (req, res) => {
  res.render("medicines/new");
};

// Create new medicine
const createMedicine = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    const { name, price, discountPrice, quantity, manufacturer } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    try {
      const newMedicine = new Medicine({
        name,
        price,
        discountPrice,
        quantity,
        manufacturer,
        imageUrl,
      });
      await newMedicine.save();
      // Clear cache after creating a new medicine
      cache.del("medicines");
      res.redirect("/medicines");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
};

// Render form to edit an existing medicine
const showEditMedicineForm = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    res.render("medicines/edit", { medicine });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update an existing medicine
const updateMedicine = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    const { name, price, discountPrice, quantity, manufacturer } = req.body;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.existingImageUrl;
    try {
      await Medicine.findByIdAndUpdate(req.params.id, {
        name,
        price,
        discountPrice,
        quantity,
        manufacturer,
        imageUrl,
      });
      // Clear cache after updating a medicine
      cache.del("medicines");
      res.redirect("/medicines");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
};

// Delete a medicine
const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    // Clear cache after deleting a medicine
    cache.del("medicines");
    res.redirect("/medicines");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get a single medicine by ID
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    res.render("medicines/show", { medicine });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllMedicines,
  showCreateMedicineForm,
  createMedicine,
  showEditMedicineForm,
  updateMedicine,
  deleteMedicine,
  getMedicineById,
};
