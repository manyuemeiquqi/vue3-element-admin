import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { isString } from 'lodash'
import { StoreName } from '@/store/type'

export const REDIRECT_ROUTE_NAME = 'Redirect'

export const DEFAULT_ROUTE_NAME = 'Workplace'

export const DEFAULT_ROUTE = {
  title: 'menu.dashboard.workplace',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/dashboard/workplace'
}

export interface TagProps {
  title: string
  name: string
  fullPath: string
  query?: any
  ignoreCache?: boolean
}

export interface TabBarState {
  tagList: TagProps[]
  cacheTabList: Set<string>
}

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.locale || '',
    name: String(name),
    fullPath,
    query,
    ignoreCache: meta.ignoreCache
  }
}

const BAN_LIST = [REDIRECT_ROUTE_NAME]

const useAppStore = defineStore(StoreName.tab, {
  state: (): TabBarState => ({
    cacheTabList: new Set([DEFAULT_ROUTE_NAME]),
    tagList: [DEFAULT_ROUTE]
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    }
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as string)) return
      this.tagList.push(formatTag(route))
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string)
      }
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(name: string) {
      if (isString(name) && name !== '') this.cacheTabList.add(name)
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.ignoreCache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = [DEFAULT_ROUTE]
      this.cacheTabList.clear()
      this.cacheTabList.add(DEFAULT_ROUTE_NAME)
    }
  }
})

export default useAppStore
