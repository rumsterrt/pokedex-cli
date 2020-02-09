import request from 'utils/request'
import { log } from 'utils/log'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import { toJS } from 'mobx'
const PokedexStore = () => {
    return {
        items: [],
        isLoading: false,
        isLoaded: false,
        error: null,
        itemsDetails: {},
        types: {},
        pagination: {
            limit: 10,
            filter: false,
        },

        getPagination(page = 1) {
            const limit = this.pagination.limit
            return {
                ...this.pagination,
                total: this.items.length,
                items: this.items.slice((page - 1) * limit, (page - 1) * limit + limit),
            }
        },

        async loadAllItemsIfNeeded() {
            if (this.isLoading || this.isLoaded) {
                return Promise.resolve()
            }
            if (this.error) {
                this.error = ''
            }
            try {
                this.isLoading = true
                const count = (
                    await request('pokemon', {
                        params: { limit: 0 },
                    })
                ).count
                let loadChunk = Promise.resolve()
                for (let i = 0; i < count; i += 100) {
                    loadChunk = loadChunk
                        .then(() => request(`pokemon/?offset=${i}&limit=${100}`))
                        .then(({ results }) => this.items.push(...results.map(item => item.name)))
                }
                loadChunk.then(() => {
                    this.isLoaded = true
                })
            } catch (err) {
                log('main store::nextPage: ', err)
            } finally {
                this.isLoading = false
            }
        },

        updatePagination(params) {
            if (params && _isEqual(toJS(this.pagination), toJS(params))) {
                return Promise.resolve()
            }
            this.pagination = Object.keys(params || {}).length ? Object.assign(this.pagination || {}, params) : {}
        },

        async loadDetailsIfNeeded(name) {
            if (!name || this.items[name]) {
                return
            }

            const response = await request(`pokemon/${name}`)
            this.itemsDetails[name] = response
        },
    }
}

export default PokedexStore
