import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setTextContent, truncateText } from './'

//to use fromNow Function
dayjs.extend(relativeTime)

export function createPostElement(post) {
  if (!post) return

  //find and clone template
  try {
    const postTemplate = document.getElementById('postTemplate')
    if (!postTemplate) return

    const liElement = postTemplate.content.firstElementChild.cloneNode(true)
    if (!liElement) return

    //update title description, author, thumbnail
    setTextContent(liElement, '[data-id="title"]', post.title)
    setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
    setTextContent(liElement, '[data-id="author"]', post.author)

    //calculate timespan
    var timespan = dayjs(post.updatedAt).fromNow()
    setTextContent(liElement, '[data-id ="timeSpan"]', `- ${timespan}`)

    const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')

    if (thumbnailElement) {
      thumbnailElement.src = post.imageUrl

      thumbnailElement.addEventListener('error', () => {
        thumbnailElement.src = './images/recipe.jpg'
      })
    }

    //attach events
    // go to post detail when click on div.post-item
    const divElement = liElement.firstElementChild
    if (divElement) {
      divElement.addEventListener('click', (event) => {
        const menu = liElement.querySelector('[data-id="menu"]')
        if (menu && menu.contains(event.target)) return
        // console.log('parent click')
        window.location.assign(`/post-detail.html?id=${post.id}`)
      })
    }
    //add click event for edit button
    const editButton = liElement.querySelector('[data-id="edit"]')
    if (editButton) {
      editButton.addEventListener('click', () => {
        // console.log("edit click")
        window.location.assign(`/add-edit-post.html?id=${post.id}`)
      })
    }

    //add click event for remove button
    const removeButton = liElement.querySelector('[data-id="remove"]')
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        const customEvent = new CustomEvent('post-delete', {
          bubbles: true,
          detail: post,
        })

        removeButton.dispatchEvent(customEvent)
      })
    }
    return liElement
    
  } catch (error) {
    console.log('failed to create post item', error)
  }
}
export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return

  //clear current list
  const ulElement = document.getElementById(elementId)
  if (!ulElement) return
  ulElement.textContent = ''

  postList.forEach((post, idx) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
