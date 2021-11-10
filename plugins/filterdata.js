export default ({ app }, inject) => {
  // Inject $filterdata() in Vue, context and store.
  inject('filterdata', (data) => {
    const retval = []

    data.forEach((e) => {
      const el = {
        id: e.first_checkin_id,
        beer: e.beer.beer_name,
        brewery: e.brewery.brewery_name,
        slug: e.beer.beer_slug,
        score: e.rating_score,
        label: e.beer.beer_label,
      }
      retval.push(el)
    })

    return retval
  })
}
