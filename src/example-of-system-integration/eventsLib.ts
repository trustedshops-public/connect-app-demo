if (!window.eventsLib) {
  const eventsLib = '../../public/eventsLib.js'
  window.eventsLib = eventsLib
}

const EVENTS = window.eventsLib.EVENTS
const dispatchAction = window.eventsLib.dispatchAction
const registerEvents = window.eventsLib.registerEvents

export { registerEvents, dispatchAction, EVENTS }
export default { registerEvents, dispatchAction, EVENTS }
