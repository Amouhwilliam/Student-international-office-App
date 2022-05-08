import express from "express"
import {login, passwordRecovery} from "../controllers/auth.controller"

const AuthRouter = (app: any) => {

    var router = express.Router();
  
    router.post("/login", login);

    router.post("/password-recovery", passwordRecovery);

    app.use('/api/auth', router);
  
  };

  export {AuthRouter}