import { app } from './server'
import { Estimate } from './api/controllers/estimate'
import { Confirm } from './api/controllers/confirm'
import { FindRide } from './api/controllers/findRide'
import { CustomerController } from './api/controllers/customerController'
import { DriverController } from './api/controllers/driverController'
import { ReviewController } from './api/controllers/reviewController'

export const routes = async () => {
    app.register(CustomerController)
    app.register(DriverController)
    app.register(ReviewController)
    app.register(Estimate, { prefix: '/ride' })
    app.register(Confirm, { prefix: '/ride' })
    app.register(FindRide, { prefix: '/ride' })
}