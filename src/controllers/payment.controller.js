import mercadopage from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopage.configure({
    access_token: MERCADOPAGO_API_KEY,
  });

  try {
    const result = await mercadopage.preferences.create({
      items: [
        {
          title: "Laptop_1",
          unit_price: 10,
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      //notification_url: "https://https://b04d-201-213-113-23.sa.ngrok.io/webhook",
      back_urls: {
        success: "http://localhost:3000/success",
        //failure: "https://https://b04d-201-213-113-23.sa.ngrok.io/failure"
        // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
        // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
      },
    });

    console.log(result);

    // res.json({ message: "Payment creted" });
    res.json(result.body);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const failureWebhook = async (req, res) => {
  console.log(req);
  res.sendStatus(200);
}
