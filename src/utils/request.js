import axios from 'axios'
import localForage from 'localforage'
import { log } from './log'
import _get from 'lodash/get'
import config from '../../config'

axios.defaults.timeout = (config.BACKEND_TIMEOUT || 5) * 1000
axios.defaults.baseURL = config.API_URI

function _loadUrl(url) {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                // if there was an error
                if (response.status >= 400) {
                    reject(response)
                } else {
                    //cache value
                    localForage.setItem(`${CACHE_PREFIX}${url}`, response.data)
                    resolve(response.data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

const CACHE_PREFIX = 'pokeapi-cache'
const attemptDelays = [1000, 5000, 10000]

const request = (url, attemptNum = 0) => {
    return new Promise((resolve, reject) => {
        localForage
            .ready()
            .then(() => {
                return localForage.getItem(`${CACHE_PREFIX}${url}`)
            })
            .then(value => {
                if (value === null) {
                    return _loadUrl(url)
                } else {
                    return Promise.resolve(value)
                }
            })
            .then(result => resolve(result))
            .catch(err => {
                if (err.code === 'ECONNABORTED' && attemptNum < attemptDelays.length) {
                    log(`request retry ${attemptNum}`, url)
                    setTimeout(() => request(url, attemptNum + 1), attemptDelays[attemptNum])
                } else {
                    log('request error', { error: err })
                    reject(err)
                }
            })
    })
}

export default request
