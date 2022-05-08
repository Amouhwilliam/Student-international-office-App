import {Request, Response} from "express";
import db from "../models";
import {LogInDto} from "../helpers/dataSchema";
import * as bcrypt from "bcrypt"
import {createToken} from "../helpers/jwt";
const User = db.users;

export const login = async (req: Request, res: Response) => {
    try {
        const logInData: LogInDto = req.body;
        const user = await User.findOne({ email: logInData.email });
        if (user) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
            if (isPasswordMatching) {
                const tokenData = createToken(user);
                res.status(200).send({
                    user,
                    token: tokenData
                });
            } else {
                res.status(403).send({
                    message: "Password incorrect" 
                });
            }
        } else {
            res.status(403).send({
                message: "User not found",
            });
        }
    } catch (error: any) {
        res.send({
            message: error.message || "Error: Request failed",
            error ,
            status: res.status
        });
    }
};

export const passwordRecovery = async (req: Request, res: Response) => {
    try {
        const logInData: LogInDto = req.body;
        const user = await User.findOne({ email: logInData.email })

        User.findByIdAndUpdate(user._id, {...user, password: 'New password'}, { useFindAndModify: false })
            .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot change User's id=${user._id} password. Maybe User was not found!`,
                });
            } else res.send({ 
                message: "Password was updated successfully.",
                new_password: 'New password',
                user
            });
        })
    } catch (error: any) {
        res.status(404).send({
            message: error.message || 'Error: request failed',
            error
        });
    }
};

