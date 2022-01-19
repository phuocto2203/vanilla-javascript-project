import postApi from './api/postApi'
import { initPagination, initSearch, renderPostList, renderPagination, toast } from './utils'


async function handleFilterChange(filterName, filterValue) {
  try {
    //update query params
    const url = new URL(window.location)

    if(filterName) url.searchParams.set(filterName, filterValue)

    //reset page if needed
    if (filterName == 'title_like') url.searchParams.set('_page', 1)
    history.pushState({}, '', url)

    //fetch api
    //re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList('postList',data)
    renderPagination('postsPagination', pagination)
  } catch (error) {
    console.log('fail to fetch post list', error)
  }
}

function registerPostDeleteEvent() {
  document.addEventListener('post-delete', async (event) => {
    try {
      //call API to remove post by id
      const post = event.detail
     
      const message = `Are you sure to remove post "${post.title}"?`
      if(window.confirm(message)){
        await postApi.remove(post.id)
        await handleFilterChange()

        toast.success("Remove post successfully!")
      }

    } catch (error) {
      console.log('failed to remove post', error)
      toast.error(error.message)
    }
    
  })
}
// MAIN
;(async () => {
  try {
    const url = new URL(window.location)

    //update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)
  
    history.pushState({}, '', url)

    const queryParams = url.searchParams

    registerPostDeleteEvent()

    //attach event for links
    initPagination({
      elementId: "postsPagination",
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page)
    })

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    })

    //render post list based URL params
    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList('postList', data)
    renderPagination('postsPagination', pagination)
  } catch (error) {
    new Error('Cannot call api!!!')
    //show modal. toast error
  }
})()

