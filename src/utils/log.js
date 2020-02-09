let consoleEnabled

const isConsoleEnabled = () => {
    if (process.env.REACT_APP_STAGE !== 'production') {
        return true
    }

    if (consoleEnabled === undefined) {
        consoleEnabled = localStorage.getItem('debug') === 'on' || window.location.search.indexOf('debug=on') !== -1
    }

    return consoleEnabled
}

export const log = (...args) => {
    if (!isConsoleEnabled()) {
        return
    }

    // eslint-disable-next-line no-console
    console.log(...args)
}

log.error = (...args) => {
    // eslint-disable-next-line no-console
    console.error(...args)
}
