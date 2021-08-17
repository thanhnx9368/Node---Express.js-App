module.exports = {
  sum: (a, b) => a + b,
  sortable: (field, _sort) => {
    const { type, column } = _sort
    const sortType = column == field ? type : 'default'

    const types = {
      default: 'desc',
      desc: 'asc',
      asc: 'desc',
    }

    const icons = {
      default: 'bi-soundwave',
      desc: 'bi-sort-alpha-down',
      asc: 'bi-sort-alpha-up',
    }

    const icon = icons[sortType]
    const typeQuery = types[sortType]

    return `<a href="?_sort&column=${field}&type=${typeQuery}">
                    <i class="bi ${icon}"></i>
                </a>`
  },
}
