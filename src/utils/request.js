import axios from 'axios'
import localForage from 'localforage'
import { log } from './log'
import _get from 'lodash/get'

axios.defaults.timeout = (process.env.REACT_APP_BACKEND_TIMEOUT || 5) * 1000
axios.defaults.baseURL = 'https://pokeapi.co/api/v2/'

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

export default url => {
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
                log('request >>>>>>>>>>>>>>>>>>>>>>', { error: err })
                reject(err)
            })
    })
}
