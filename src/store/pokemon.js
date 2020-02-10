import request from 'utils/request'
import { log } from 'utils/log'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _intersection from 'lodash/intersection'
import { toJS } from 'mobx'
const PokedexStore = () => {
    return {
        items: [],
        isLoading: false,
        isLoaded: false,
        error: null,
        itemsDetails: {},
        _types: [],
        pagination: {
            limit: 10,
            search: '',
            types: null,
        },

        _calcPaginationItems(page) {
            let items = [...this.items]
            const { search, types, limit } = this.pagination
            const searchUpp = search.toUpperCase()

            if (search || (types && types.length > 0)) {
                items = items.filter(item => {
                    const localTypes = _get(this.itemsDetails, `${item}.types`, []).map(item => item.type.name)
                    return (
                        (!search || item.toUpperCase().indexOf(searchUpp) > -1) &&
                        (!(types && types.length > 0) || _intersection(types, localTypes).length > 0)
                    )
                })
            }

            const total = items.length
            return {
                items: items.slice((page - 1) * limit, (page - 1) * limit + limit),
                total,
                totalPages: Math.ceil(total / limit),
            }
        },

        getPagination(page = 1) {
            return {
                ...this.pagination,
                ...this._calcPaginationItems(page),
            }
        },

        get types() {
            return this._types
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
                await this._loadByChunck('pokemon', this.items)
                await this._loadByChunck('type', this._types)
                this.isLoaded = true
            } catch (err) {
                log('main store::nextPage: ', err)
            } finally {
                this.isLoading = false
            }
        },
        async _loadByChunck(url, array) {
            const count = (
                await request(url, {
                    params: { limit: 0 },
                })
            ).count
            let loadChunk = Promise.resolve()
            for (let i = 0; i < count; i += 100) {
                loadChunk = loadChunk
                    .then(() => request(`${url}/?offset=${i}&limit=${100}`))
                    .then(({ results }) => array.push(...results.map(item => item.name)))
            }
            return loadChunk
        },
        //update only if new values were recieved
        updatePagination(params) {
            if (params && _isEqual(toJS(this.pagination), toJS(params))) {
                return false
            }
            this.pagination = Object.keys(params || {}).length ? Object.assign(this.pagination || {}, params) : {}
            return true
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
