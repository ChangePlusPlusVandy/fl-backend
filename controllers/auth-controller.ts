import { getAuth } from "firebase-admin/auth";
import { Request, Response } from "express";
import { CommonErrors } from "../utils/common-errors";
import { User } from "../models/user.model";

export interface CreateAccountRequest {
    firebaseUserId: string
    name: string
    type: 'Default' | 'Staff' | 'Family'
}

export const createAccount = async (request: Request, response: Response) => {
    const body: CreateAccountRequest = request.body;

    if (!body.firebaseUserId || !body.name || !body.type) {
        return response.status(400).json({ error: CommonErrors.BadRequest });
    }

    try {
        const firebaseUser = getAuth().getUser(body.firebaseUserId);
        if (!firebaseUser) {
            return response.status(400).json({ error: CommonErrors.NotFound });
        }

        const user = new User({
            firebaseUserId: body.firebaseUserId,
            name: body.name,
            type: body.type,
        });
    
        await user.save();

        return response.status(200).json({ user });
    } catch (e) {
        return response.status(500).json({ error: e });
    }
}