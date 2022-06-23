userRoute = require('./user')
memberRoute = require('./member')
researchRoute = require('./research')
equipmentRoute = require('./equipment')
managementRoute = require('./management')
file = require('./file')

function route(app){
    app.use('/membercontroller', memberRoute)
    app.use('/filecontroller', file)
    app.use('/researchcontroller', researchRoute)
    app.use('/equipmentcontroller', equipmentRoute)
    app.use('/usercontroller', userRoute)
    app.use('/managementcontroller', managementRoute)
}

module.exports = route