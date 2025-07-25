import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with daatabase
export const clerkWebhooks = async (req, res) => {
  try {
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    const body = JSON.stringify(req.body);

    // Create a Svix instance clerk webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    let evt;

    try {
      // Verifying Headers
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).json({ Error: err.message });
    }

    const { data, type } = req.body;

    // Switch Cases for different Events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data._id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Wenhooks Error" });
  }
};
