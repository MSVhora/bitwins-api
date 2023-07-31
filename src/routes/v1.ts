import { Router } from 'express';
import AuthRoutes from '../components/auth/v1'
import UserRoutes from '../components/user/v1'
import TicTacToeRoutes from '../components/tic-tac-toe-game/v1'


export const v1Router = Router()

v1Router.use(`/auth`, AuthRoutes)

v1Router.use(`/user`, UserRoutes)

v1Router.use(`/tic-tac-toe`, TicTacToeRoutes)
