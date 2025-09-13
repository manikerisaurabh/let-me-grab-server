import bcrypt from "bcrypt";
import "dotenv/config";

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;

export const encryptPhoneNumber = async (phoneNumber) => {
    try {
        const hash = await bcrypt.hash(phoneNumber, saltRounds);
        return hash;
    } catch (error) {
        console.error("Encryption failed:", error);
        throw new Error("Failed to encrypt phone number.");
    }
};

export const comparePhoneNumber = async (phoneNumber, hash) => {
    try {
        const match = await bcrypt.compare(phoneNumber, hash);
        return match;
    } catch (error) {
        console.error("Comparison failed:", error);
        return false;
    }
};
