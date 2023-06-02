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
      auto_return: "approved",
      notification_url: "https://cc59-190-104-238-200.ngrok-free.app/webhook?userId=64511f7a16d0e06681281c28&productId=6233812cef721a65be60c62d",
      back_urls: {
        success: "https://cc59-190-104-238-200.ngrok-free.app/success",
        failure: "https://cc59-190-104-238-200.ngrok-free.app/failure"
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
    console.log('PAYMENT IN QUERY HOOK', payment);
    if (payment.type === "payment") {
      const data = await mercadopage.payment.findById(payment["data.id"]);
      console.log('PAYMENT IN MP', data);
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
