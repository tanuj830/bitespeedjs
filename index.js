require("reflect-metadata");
const express = require("express");
const { AppDataSource } = require("./data-source");
const { identifyContact } = require("./services/contactService");

const app = express();
app.use(express.json());

app.post("/identify", async (req, res) => {
  const { email, phoneNumber } = req.body;
  try {
    const result = await identifyContact(email, phoneNumber);
    res.status(200).json({ contact: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
