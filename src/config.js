import {
  FILTER_TYPE_RANGE,
  FILTER_TYPE_SELECT,
} from '@/constants'

export const filterConfig = {
  category: {
    key: 'Category',
    type: FILTER_TYPE_SELECT,
  },
  value: {
    key: 'Value',
    type: FILTER_TYPE_RANGE,
  },
}
