const basePath = 'http://localhost:1234'
const env = 'dev'
const MELDET_EMAIL = 'tielbody@student.arteveldehs.be'
const routes = {
    index: basePath,
    register: `${basePath}/register`,
    dashboard: `${basePath}/dashboard`,
    additionalInfo: `${basePath}/additional-info`,
    editProfile: `${basePath}/edit-profile`,
    newEvent: `${basePath}/new-event`,
    detail:`${basePath}/detail`,
    editEvent:`${basePath}/edit-event`,
    discussion: `${basePath}/discussion`,
    meldet:`${basePath}/meldet`
}
export {
    env, routes, MELDET_EMAIL
    
}