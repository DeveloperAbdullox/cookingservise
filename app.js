const express = require("express");
const app = express();
const sequelize = require("./config/db.js"); // DB bilan bog'langan fayl
const paymentRoutes = require("./routes/payment.routes");
const deliveryRoutes = require("./routes/delivery.routes");
const userRoutes = require("./routes/user.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const foodRoutes = require("./routes/foods.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const orderItemRoutes = require("./routes/orderItem.routes.js");
const restaurantRoutes = require("./routes/restaurants.routes.js");
const errorHandler = require("./middleware/error/errorHandling.js")

const authRoutes = require("./routes/auth.routes.js")

// Middleware
app.use(express.json());

app.use("/user",  userRoutes)
app.use("/food", foodRoutes)
app.use("/order", orderRoutes)
app.use("/category", categoryRoutes)
app.use("/payment", paymentRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/orderItem", orderItemRoutes);
app.use("/restaurant", restaurantRoutes)
app.use("/auth", authRoutes)

app.use(errorHandler)

// DB bilan bog'lanish va serverni ishga tushirish
const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log("DB bilan bog'lanish muvaffaqiyatli!");
    return sequelize.sync({alter: true}); // Jadval mavjud bo'lmasa yaratadi
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishlayapti`);
    });
  })
  .catch((err) => {
    console.error("DB bilan boglanishda xatolik:", err);
  });
