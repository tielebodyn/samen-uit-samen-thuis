const basePath = 'http://localhost:1234'
const SENDGRID_API_KEY = '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'
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGllbGVib2R5biIsImEiOiJjbDZrcXE1cXMwNGV5M2ptbzdsNG04OHFuIn0.mRHi10TXUamkZMoUUmztGg'
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
    env, routes, MELDET_EMAIL, SENDGRID_API_KEY, MAPBOX_TOKEN
    
}