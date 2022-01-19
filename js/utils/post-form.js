import * as yup from 'yup'
import { randomNumber, setTextContent } from '.'
import { setFieldValue } from './common'
import { setBackgroundImage } from './common'

const ImageSource = {
  PICSUM: 'picsum',
  UPLOAD: 'upload',
}
function setFormValues(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title)
  setFieldValue(form, '[name="author"]', formValues?.author)
  setFieldValue(form, '[name="description"]', formValues?.description)

  setFieldValue(form, '[name = "imageUrl"]', formValues?.imageUrl) //hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl)
}

function getFormValues(form) {
  const formValues = {}
  // ;['title', 'author', 'description', 'imageSource', 'imageUrl', 'image'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`)
  //   if (field) formValues[name] = field.value
  // })
const data = new FormData(form)
for (const [key, value] of data) {
  formValues[key] = value
}
  return formValues
}

function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter title'),
    author: yup
      .string()
      .required('Please enter author')
      .test(
        'at-least-two-words',
        'Please enter at least two words',
        (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
      ),
    description: yup.string(),
    imageSource: yup
      .string()
      .required('Please select an image source')
      .oneOf([ImageSource.PICSUM, ImageSource.UPLOAD], 'Invalid image source'),
    imageUrl: yup.string().when('imageSource', {
      is: ImageSource.PICSUM,
      then: yup
        .string()
        .required('Please random a background image')
        .url('Please enter a valid url'),
    }),
    image: yup.mixed().when('imageSource', {
      is: ImageSource.UPLOAD,
      then: yup
        .mixed()
        .test('required', 'Please select an image to upload', (value) => Boolean(value?.name))
        .test('max-3mb', 'The image is too large, max size is 3mb', (file) => {
          const fileSize = file?.size || 0
          const MAX_SIZE = 3*1024*1024 //3mb
          return fileSize <= MAX_SIZE
        }),
    }),
  })
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`)
  if (element) {
    element.setCustomValidity(error)
    setTextContent(element.parentElement, '.invalid-feedback', error)
  }
}

async function validatePostForm(form, formValues) {

  try {
    //reset previous errors
    ;['title', 'author', 'imageUrl', 'image'].forEach((name) => setFieldError(form, name, ''))

    const schema = getPostSchema()
    await schema.validate(formValues, { abortEarly: false })
  } catch (error) {
    const errorLog = {}

    for (const validationError of error.inner) {
      const name = validationError.path

      // ignore if the field is already logged
      if (errorLog[name]) continue

      //set field error and mark as logged
      setFieldError(form, name, validationError.message)
      console.log(validationError.message)
      errorLog[name] = true
    }
  }

  //add was-validated class to form element
  const isValid = form.checkValidity()
  if (!isValid) form.classList.add('was-validated')
  return isValid
}

function initRandomImage(form) {
  const randomButton = document.getElementById('postChangeImage')
  if (!randomButton) return

  randomButton.addEventListener('click', () => {
    // random Id
    // build url
    const imageUrl = `https://picsum.photos/id/${randomNumber(1000)}/1368/400`
    //set imageurl input + background
    setFieldValue(form, '[name = "imageUrl"]', imageUrl) //hidden field
    setBackgroundImage(document, '#postHeroImage', imageUrl)
  })
}
function renderImageSourceControl(form, selectedValues) {
  const controlList = form.querySelectorAll('[data-id="imageSource"]')
  controlList.forEach((control) => {
    control.hidden = control.dataset.imageSource !== selectedValues
    

  })
}
function innitRadioImageSource(form) {
  const radioList = form.querySelectorAll('[name="imageSource"]')
  radioList.forEach((radio) => {
    radio.addEventListener('change', (event) => renderImageSourceControl(form, event.target.value))
  })
}

function initUploadImage(form) {
  const uploadImage = form.querySelector('[name="image"]')
  if (!uploadImage) return

  uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBackgroundImage(document, '#postHeroImage', imageUrl)
    }
  })
}
export function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId)
  if (!form) return

  setFormValues(form, defaultValues)

  //init events
  initRandomImage(form)
  innitRadioImageSource(form)
  initUploadImage(form)

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    //get form values
    const formValues = getFormValues(form)
    formValues.id = defaultValues.id

    //validation
    //if valid trigger submit callback
    //otherwise, show validation errors

    const isValid = await validatePostForm(form, formValues)
    if (isValid) await onSubmit?.(formValues)
  })
}
