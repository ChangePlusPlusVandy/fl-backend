import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import "dotenv/config";

const creds = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

const app = initializeApp({
  credential: cert(creds as ServiceAccount),
});

const auth = getAuth(app);
export { auth };
