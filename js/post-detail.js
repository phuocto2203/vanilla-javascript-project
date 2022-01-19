import postApi from './api/postApi'
import { setTextContent } from './utils'
import dayjs from 'dayjs'
import { registerLightbox } from './utils/lightbox'

function renderPostDetail(post) {
    if (!post) return
    setTextContent(document, '#postDetailTitle', post.title)
    setTextContent(document, '#postDetailAuthor', post.author)
    setTextContent(document, '#postDetailTimeSpan', dayjs(post.updatedAt).format('- DD/MM/YYYY HH:mm'))
    setTextContent(document, '#postDetailDescription', post.description)
    setTextContent(document, '#postDetailTitle', post.title)
//render hero image(imageURL)

const heroImage = document.getElementById('postHeroImage')
if (heroImage) {
    heroImage.style.background = `url("${post.imageUrl}")`
}
heroImage.addEventListener('error', () => {
    heroImage.style.background = './images/recipe.jpg'
  })

  //render edit page link
const editPageLink = document.getElementById('goToEditPageLink')
if (editPageLink){
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    editPageLink.textContent = 'Edit Post'
}
}

;(async () => {

  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]'
  })

  registerLightbox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]'
  })
  
  // get post id from URL
  //fetch post detail API
  //render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')

    if (!postId) {
      console.log('Post not found')
      return
    }

    const post = await postApi.getById(postId)
    renderPostDetail(post)
  } catch (error) {
    console.log('failed to fetch post detail', error)
  }
})()
