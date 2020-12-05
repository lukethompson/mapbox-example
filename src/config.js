import {
  FILTER_TYPE_RANGE,
  FILTER_TYPE_SELECT,
} from '@/constants'

export const filterConfig = {
  stage: {
    key: 'Stage',
    type: FILTER_TYPE_SELECT,
  },
  category: {
    key: 'Category',
    type: FILTER_TYPE_SELECT,
  },
  status: {
    key: 'Status',
    type: FILTER_TYPE_SELECT,
  },
  value: {
    key: 'Value',
    type: FILTER_TYPE_RANGE,
  },
  ownership: {
    key: 'Ownership',
    type: FILTER_TYPE_SELECT,
  },
}
